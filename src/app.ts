import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";
import flash from "connect-flash";
import nocache from "nocache";

import { StudentRoute } from "./routes/studentRoutes";
import { StudentController } from "./controller/studentController";
import { StudentService } from "./services/studentServices";
import { StudentRepository } from "./repository/studentRepository";

import { AdminRepository } from "./repository/adminRepository";
import { AdminService } from "./services/adminServices";
import { AdminController } from "./controller/adminController";
import { AdminRoute } from "./routes/adminRoutes";


declare module "express-session" {
  interface SessionData {
    student?: string | null;
    admin?: string | null;
  }
}

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
    this.app.use(express.static(path.join(__dirname, "../src/public")));
  }

  private setupViewEngine() {
    this.app.set("views", path.join(__dirname, "views"));
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
