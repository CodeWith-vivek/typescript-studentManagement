
import { IstudentService } from "./student.interface";
import { Istudent } from "./student.interface";
import { Request, Response } from "express";

export class StudentController{
    private studentServices:IstudentService;

    constructor(studentServices:IstudentService){
        this.studentServices = studentServices;
    }


    async registerStudent(req:Request,res:Response): Promise <void>{
        try {

            const student:Istudent = req.body

            const result = await this.studentServices.createStudent(student);

            if(!result){
                req.flash('error_msg','Email alredy exist');
                res.redirect('/register');
            }else{
                req.flash("success_msg", "successfully registered");
                res.redirect('/');
            }

            
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message);
            }
        }
    }

    async loadLoginStudent(req:Request,res:Response):Promise <void>{
        try {

            res.render('students/login');
            
        } catch (error) {
            if(error instanceof Error){
                console.log(error.message);
            }
        }

    }


    async loginStudent(req:Request,res:Response):Promise <void>{
        try {
          const email: string = req.body.email;
          const password: string = req.body.password;

          const result: boolean | Istudent =
            await this.studentServices.loginStudent(email, password);

          if (result) {
            req.session.student = email;
            req.session.admin = null;
            req.session.save((err) => {
              if (err) {
                console.error("Error saving session:", err);
              }
              res.redirect("/home");
            });
          } else {
            req.flash("error_msg", "Email and password is not matching");
            res.redirect("/");
          }
        } catch (error) {
          console.log(error);
        }

    }

    async loadRegisterStudent(req:Request,res:Response):Promise <void>{
        try {
            res.render('students/register');
        } catch (error) {
            console.log(error);
            
        }
    }

    async loadHome(req:Request,res:Response):Promise <void>{
        try {
          const userData: Istudent | null =
            await this.studentServices.findStudent(
              req.session.student as string
            );
          res.setHeader(
            "Cache-Control",
            "no-store, no-cache, must-revalidate, proxy-revalidate"
          );
          return res.render("students/home", { userData });
        } catch (error) {
          console.log(error);
        }
    }

    async loadEditUser(req:Request,res:Response):Promise <void>{

        try {
          const userData: Istudent | null =
            await this.studentServices.findStudent(
              req.session.student as string
            );
          res.setHeader(
            "Cache-Control",
            "no-store, no-cache, must-revalidate, proxy-revalidate"
          );
          return res.render("students/editUser", { userData });
        } catch (error) {
          console.log(error);
        }


    }

    async editStudent(req:Request,res:Response):Promise <void>{
        try {

            const student:Istudent = req.body;
            if(!req.session.student || typeof req.session.student != 'string'){
                req.flash("error_msg", "Session expired. Please log in again.");
                res.redirect("/login");
                return;
            }

            const currentEmail = req.session.student;
            const result = await this.studentServices.editStudent(student,currentEmail);

            if(result){
                req.flash("success_msg", "sucessfully updated");      
                res.redirect('/home')
            }else{
                req.flash("error", "failed to update data");          
                res.redirect('/home')}
            
        } catch (error) {
            console.log(error);
        }
    }

    async logout(req:Request,res:Response):Promise <void>{

        try {
          req.session.student = null;

          req.session.save((err) => {
            if (err) {
              console.error("Error saving session:", err);
              return res.status(500).send("Failed to log out");
            }
            res.redirect("/");
          });
        } catch (error) {
          console.log(error);
          res.status(500).send("Failed to logout");
        }
    }

}