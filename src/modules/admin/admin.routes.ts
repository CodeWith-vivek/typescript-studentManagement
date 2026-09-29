import Express, { Request, Response } from "express";
import { AdminController } from "./admin.controller";
import {
  ensureAdminAuthenticated,
  forwardAdminAuthenticated,
} from "../../shared/middlewares/auth.middleware";

export class AdminRoute {
  private adminController: AdminController;
  private adminRouter: Express.Router;

  constructor(adminController: AdminController) {
    this.adminController = adminController;
    this.adminRouter = Express.Router();
    this.setRoutes();
  }

  private setRoutes() {
    this.adminRouter.get(
      "/",
      forwardAdminAuthenticated,
      (req: Request, res: Response) => {
        this.adminController.loadAdminLogin(req, res);
      }
    );
    this.adminRouter.post(
      "/login",
      forwardAdminAuthenticated,
      (req: Request, res: Response) => {
        this.adminController.adminLogin(req, res);
      }
    );

    this.adminRouter.get(
      "/home",
      ensureAdminAuthenticated,
      (req: Request, res: Response) => {
        this.adminController.loadHome(req, res);
      }
    );
    this.adminRouter.get(
      "/edit/:id",
      ensureAdminAuthenticated,
      (req: Request, res: Response) => {
        this.adminController.loadEdit(req, res);
      }
    );
    this.adminRouter.post(
      "/edit/:id",
      ensureAdminAuthenticated,
      (req: Request, res: Response) => {
        this.adminController.edit(req, res);
      }
    );
    this.adminRouter.get(
      "/delete/:id",
      ensureAdminAuthenticated,
      (req: Request, res: Response) => {
        this.adminController.delete(req, res);
      }
    );

    this.adminRouter.get("/logout", (req: Request, res: Response) => {
      this.adminController.logout(req, res);
    });
  }

  public getAdminRoute() {
    return this.adminRouter;
  }
}
