"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoute = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
class StudentRoute {
    constructor(studentController) {
        this.studentController = studentController;
        this.studentRouter = express_1.default.Router();
        this.setRoutes();
    }
    setRoutes() {
        this.studentRouter.get("/", authMiddleware_1.forwardStudentAuthenticated, (req, res) => {
            this.studentController.loadLoginStudent(req, res);
        });
        this.studentRouter.post("/login", authMiddleware_1.forwardStudentAuthenticated, (req, res) => {
            this.studentController.loginStudent(req, res);
        });
        this.studentRouter.get("/register", authMiddleware_1.forwardStudentAuthenticated, (req, res) => {
            this.studentController.loadRegisterStudent(req, res);
        });
        this.studentRouter.post("/register", authMiddleware_1.forwardStudentAuthenticated, (req, res) => {
            this.studentController.registerStudent(req, res);
        });
        this.studentRouter.get("/home", authMiddleware_1.ensureStudentAuthenticated, (req, res) => {
            this.studentController.loadHome(req, res);
        });
        this.studentRouter.get("/editUser", authMiddleware_1.ensureStudentAuthenticated, (req, res) => {
            this.studentController.loadEditUser(req, res);
        });
        this.studentRouter.post("/editUser", authMiddleware_1.ensureStudentAuthenticated, (req, res) => {
            this.studentController.editStudent(req, res);
        });
        this.studentRouter.get("/logout", (req, res) => {
            this.studentController.logout(req, res);
        });
    }
    getStudentRoute() {
        return this.studentRouter;
    }
}
exports.StudentRoute = StudentRoute;
