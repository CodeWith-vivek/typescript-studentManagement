"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
    },
    class: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }, roleno: {
        type: Number,
        required: true
    },
}, { timestamps: true });
const userModule = mongoose_1.default.model("user", UserSchema);
exports.default = userModule;
