"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
class AdminController {
    constructor(adminService) {
        this.adminServices = adminService;
    }
    adminLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const password = req.body.password;
                const result = yield this.adminServices.LoginStudent(email, password);
                if (result) {
                    req.session.admin = email;
                    res.redirect("/admin/home");
                }
                else {
                    req.flash("error_msg", "Wrong mail and Password");
                    res.redirect("/admin");
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    loadAdminLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.render("admin/login");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    loadHome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.adminServices.findStudent();
                res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
                if (result) {
                    res.render("admin/home", { result });
                }
                else {
                    req.flash("error_msg", "cannot fetch student data");
                    res.redirect("/admin");
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    loadEdit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.params.id;
                const userData = yield this.adminServices.findStudentByEmail(email);
                res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
                if (userData) {
                    res.render("admin/editUser", { userData });
                }
                else {
                    req.flash("error_msg", "cant fetch data from database");
                    res.redirect("/admin/home");
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.params.id;
                const name = req.body.name;
                const clas = req.body.class;
                const roleno = req.body.roleno;
                const result = yield this.adminServices.edit(email, name, clas, roleno);
                if (result) {
                    req.flash("success_msg", "updated successfully");
                    res.redirect("/admin/home");
                }
                else {
                    req.flash("error_msg", "data updation failed");
                    res.redirect("/admin/home");
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.params.id;
                const result = yield this.adminServices.delete(email);
                if (result) {
                    req.flash("success_msg", "deleted successfully ");
                    res.redirect('/admin/home');
                }
                else {
                    req.flash("error_msg", "data deletion failed");
                    res.redirect('/admin/home');
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.session.admin = null;
                req.session.save((err) => {
                    if (err) {
                        console.error("Error saving session:", err);
                        return res.status(500).send("Failed to log out");
                    }
                    res.redirect("/admin");
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).send("Failed to logout");
            }
        });
    }
}
exports.AdminController = AdminController;
