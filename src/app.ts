import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";
import flash from "connect-flash";
import nocache from "nocache";

import "./shared/types/session";

import { StudentRoute } from "./modules/student/student.routes";
import { StudentController } from "./modules/student/student.controller";
import { StudentService } from "./modules/student/student.service";
import { StudentRepository } from "./modules/student/student.repository";

import { AdminRepository } from "./modules/admin/admin.repository";
import { AdminService } from "./modules/admin/admin.service";
import { AdminController } from "./modules/admin/admin.controller";
import { AdminRoute } from "./modules/admin/admin.routes";

export class App {
  public app: Application;

  constructor() {
    dotenv.config();
    this.app = express();
    this.setStaticFiles();
    this.setMiddleWare();
    this.setAdminRoute();
    this.setStudentRoute();
    this.setupViewEngine();
  }

  private setStaticFiles(): void {
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  private setupViewEngine() {
    this.app.set("views", path.join(__dirname, "../views"));
    this.app.set("view engine", "ejs");
  }

  private setMiddleWare(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

  this.app.use(
    session({
      secret: process.env.SESSION_SECRET || "secret",
      resave: false,
      saveUninitialized: true, 
   
    })
  );
    this.app.use(nocache());
    this.app.use(flash());

    this.app.use((req: Request, res: Response, next: () => void) => {
      res.locals.success_msg = req.flash("success_msg");
      res.locals.error_msg = req.flash("error_msg");
      next();
    });
  }

  private setStudentRoute() {
    const studentRepository = new StudentRepository();
    const studentServices = new StudentService(studentRepository);
    const studentController = new StudentController(studentServices);
    const studentRoutes = new StudentRoute(studentController);
    this.app.use("/", studentRoutes.getStudentRoute());
  }

  private setAdminRoute() {
    const adminRepository = new AdminRepository();
    const adminServices = new AdminService(adminRepository);
    const adminController = new AdminController(adminServices);
    const adminRoutes = new AdminRoute(adminController);
    this.app.use("/admin", adminRoutes.getAdminRoute());
  }

  public getApp() {
    return this.app;
  }
}
