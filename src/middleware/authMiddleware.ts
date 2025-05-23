
import { Request, Response, NextFunction } from "express";

export const ensureStudentAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.student) {
    return next();
  }
  req.flash("error_msg", "Please log in to access this resource");
  res.redirect("/");
};

export const ensureAdminAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.admin) {
    return next();
  }
  req.flash("error_msg", "Please log in to access this resource");
  res.redirect("/admin");
};

export const forwardStudentAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.student) {
    return res.redirect("/home");
  }
  next();
};

export const forwardAdminAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.admin) {
    return res.redirect("/admin/home");
  }
  next();
};
