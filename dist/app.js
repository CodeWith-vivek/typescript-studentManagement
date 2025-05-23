"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const nocache_1 = __importDefault(require("nocache"));
const studentRoutes_1 = require("./routes/studentRoutes");
const studentController_1 = require("./controller/studentController");
const studentServices_1 = require("./services/studentServices");
const studentRepository_1 = require("./repository/studentRepository");
const adminRepository_1 = require("./repository/adminRepository");
const adminServices_1 = require("./services/adminServices");
const adminController_1 = require("./controller/adminController");
const adminRoutes_1 = require("./routes/adminRoutes");
class App {
    constructor() {
        dotenv_1.default.config();
        this.app = (0, express_1.default)();
        this.setStaticFiles();
        this.setMiddleWare();
        this.setAdminRoute();
        this.setStudentRoute();
        this.setupViewEngine();
    }
    setStaticFiles() {
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "../src/public")));
    }
    setupViewEngine() {
        this.app.set("views", path_1.default.join(__dirname, "views"));
        this.app.set("view engine", "ejs");
    }
    setMiddleWare() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, express_session_1.default)({
            secret: process.env.SESSION_SECRET || "secret",
            resave: false,
            saveUninitialized: true,
        }));
        this.app.use((0, nocache_1.default)());
        this.app.use((0, connect_flash_1.default)());
        this.app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg");
            res.locals.error_msg = req.flash("error_msg");
            next();
        });
    }
    setStudentRoute() {
        const studentRepository = new studentRepository_1.StudentRepository();
        const studentServices = new studentServices_1.StudentService(studentRepository);
        const studentController = new studentController_1.StudentController(studentServices);
        const studentRoutes = new studentRoutes_1.StudentRoute(studentController);
        this.app.use("/", studentRoutes.getStudentRoute());
    }
    setAdminRoute() {
        const adminRepository = new adminRepository_1.AdminRepository();
        const adminServices = new adminServices_1.AdminService(adminRepository);
        const adminController = new adminController_1.AdminController(adminServices);
        const adminRoutes = new adminRoutes_1.AdminRoute(adminController);
        this.app.use("/admin", adminRoutes.getAdminRoute());
    }
    getApp() {
        return this.app;
    }
}
exports.App = App;
