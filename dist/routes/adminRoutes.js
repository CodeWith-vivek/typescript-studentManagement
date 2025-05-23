"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
class AdminRoute {
    constructor(adminController) {
        this.adminController = adminController;
        this.adminRouter = express_1.default.Router();
        this.setRoutes();
    }
    setRoutes() {
        this.adminRouter.get("/", authMiddleware_1.forwardAdminAuthenticated, (req, res) => {
            this.adminController.loadAdminLogin(req, res);
        });
        this.adminRouter.post("/login", authMiddleware_1.forwardAdminAuthenticated, (req, res) => {
            this.adminController.adminLogin(req, res);
        });
        this.adminRouter.get("/home", authMiddleware_1.ensureAdminAuthenticated, (req, res) => {
            this.adminController.loadHome(req, res);
        });
        this.adminRouter.get("/edit/:id", authMiddleware_1.ensureAdminAuthenticated, (req, res) => {
            this.adminController.loadEdit(req, res);
        });
        this.adminRouter.post("/edit/:id", authMiddleware_1.ensureAdminAuthenticated, (req, res) => {
            this.adminController.edit(req, res);
        });
        this.adminRouter.get("/delete/:id", authMiddleware_1.ensureAdminAuthenticated, (req, res) => {
            this.adminController.delete(req, res);
        });
        this.adminRouter.get("/logout", (req, res) => {
            this.adminController.logout(req, res);
        });
    }
    getAdminRoute() {
        return this.adminRouter;
    }
}
exports.AdminRoute = AdminRoute;
