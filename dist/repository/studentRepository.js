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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRepository = void 0;
const studentModel_1 = __importDefault(require("../models/studentModel"));
class StudentRepository {
    createStudent(student) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield studentModel_1.default.create(student);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield studentModel_1.default.findOne({ email });
        });
    }
    editStudent(student, email) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            const existingStudent = yield studentModel_1.default.findOne({ email });
            if (!existingStudent) {
                throw new Error("Student not found with the provided email.");
            }
            existingStudent.name = (_a = student.name) !== null && _a !== void 0 ? _a : existingStudent.name;
            existingStudent.class = (_b = student.class) !== null && _b !== void 0 ? _b : existingStudent.class;
            existingStudent.password = (_c = student.password) !== null && _c !== void 0 ? _c : existingStudent.password;
            existingStudent.roleno = (_d = student.roleno) !== null && _d !== void 0 ? _d : existingStudent.roleno;
            existingStudent.email = (_e = student.email) !== null && _e !== void 0 ? _e : existingStudent.email;
            return yield existingStudent.save();
        });
    }
}
exports.StudentRepository = StudentRepository;
