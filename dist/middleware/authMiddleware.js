"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forwardAdminAuthenticated = exports.forwardStudentAuthenticated = exports.ensureAdminAuthenticated = exports.ensureStudentAuthenticated = void 0;
const ensureStudentAuthenticated = (req, res, next) => {
    if (req.session.student) {
        return next();
    }
    req.flash("error_msg", "Please log in to access this resource");
    res.redirect("/");
};
exports.ensureStudentAuthenticated = ensureStudentAuthenticated;
const ensureAdminAuthenticated = (req, res, next) => {
    if (req.session.admin) {
        return next();
    }
    req.flash("error_msg", "Please log in to access this resource");
    res.redirect("/admin");
};
exports.ensureAdminAuthenticated = ensureAdminAuthenticated;
const forwardStudentAuthenticated = (req, res, next) => {
    if (req.session.student) {
        return res.redirect("/home");
    }
    next();
};
exports.forwardStudentAuthenticated = forwardStudentAuthenticated;
const forwardAdminAuthenticated = (req, res, next) => {
    if (req.session.admin) {
        return res.redirect("/admin/home");
    }
    next();
};
exports.forwardAdminAuthenticated = forwardAdminAuthenticated;
