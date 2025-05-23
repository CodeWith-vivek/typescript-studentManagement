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
exports.StudentController = void 0;
class StudentController {
    constructor(studentServices) {
        this.studentServices = studentServices;
    }
    registerStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = req.body;
                const result = yield this.studentServices.createStudent(student);
                if (!result) {
                    req.flash('error_msg', 'Email alredy exist');
                    res.redirect('/register');
                }
                else {
                    req.flash("success_msg", "successfully registered");
                    res.redirect('/');
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            }
        });
    }
    loadLoginStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.render('students/login');
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            }
        });
    }
    loginStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const password = req.body.password;
                const result = yield this.studentServices.loginStudent(email, password);
                if (result) {
                    req.session.student = email;
                    req.session.admin = null;
                    req.session.save((err) => {
                        if (err) {
                            console.error("Error saving session:", err);
                        }
                        res.redirect("/home");
                    });
                }
                else {
                    req.flash("error_msg", "Email and password is not matching");
                    res.redirect("/");
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    loadRegisterStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.render('students/register');
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    loadHome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield this.studentServices.findStudent(req.session.student);
                res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
                return res.render("students/home", { userData });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    loadEditUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield this.studentServices.findStudent(req.session.student);
                res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
                return res.render("students/editUser", { userData });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = req.body;
                if (!req.session.student || typeof req.session.student != 'string') {
                    req.flash("error_msg", "Session expired. Please log in again.");
                    res.redirect("/login");
                    return;
                }
                const currentEmail = req.session.student;
                const result = yield this.studentServices.editStudent(student, currentEmail);
                if (result) {
                    req.flash("success_msg", "sucessfully updated");
                    res.redirect('/home');
                }
                else {
                    req.flash("error", "failed to update data");
                    res.redirect('/home');
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
                req.session.student = null;
                req.session.save((err) => {
                    if (err) {
                        console.error("Error saving session:", err);
                        return res.status(500).send("Failed to log out");
                    }
                    res.redirect("/");
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).send("Failed to logout");
            }
        });
    }
}
exports.StudentController = StudentController;
