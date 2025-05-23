"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dbConnection_1 = require("./config/dbConnection");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = new app_1.App();
const database = new dbConnection_1.ConnectMongo();
database.connectDB();
const port = process.env.PORT || 3000;
app
    .getApp()
    .listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
})
    .on("error", (err) => {
    console.error("Error starting the server:", err);
});
