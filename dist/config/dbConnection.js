"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class ConnectMongo {
    constructor() {
        const dbUrl = process.env.DB_URL;
        if (!dbUrl) {
            throw new Error("DB_URL environment variable is missing");
        }
        this.databaseUrl = dbUrl;
    }
    connectDB() {
        mongoose_1.default
            .connect(this.databaseUrl)
            .then(() => console.log("Database connected successfully"))
            .catch((err) => {
            console.error("Database connection error:", err);
            throw err;
        });
    }
}
exports.ConnectMongo = ConnectMongo;
