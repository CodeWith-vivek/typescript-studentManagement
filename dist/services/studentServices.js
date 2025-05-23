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
exports.StudentService = void 0;
const bcrypt_1 = require("../utils/bcrypt");
class StudentService {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
        this.bcryptPass = new bcrypt_1.BcryptPass();
    }
    createStudent(student) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!student.email) {
                throw new Error("Email is required");
            }
            const findByEmail = yield this.studentRepository.findByEmail(student.email);
            if (findByEmail) {
                return false;
            }
            else {
                const hashedPassword = yield this.bcryptPass.hashPassword(student.password);
                const studentData = Object.assign(Object.assign({}, student), { password: hashedPassword });
                return yield this.studentRepository.createStudent(studentData);
            }
        });
    }
    loginStudent(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const findByEmail = yield this.studentRepository.findByEmail(email);
            if (findByEmail) {
                const isPasswordMatch = yield this.bcryptPass.comparePassword(password, findByEmail.password);
                if (isPasswordMatch) {
                    return findByEmail;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        });
    }
    findStudent(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const findByEmail = yield this.studentRepository.findByEmail(email);
            if (findByEmail) {
                return findByEmail;
            }
            return null;
        });
    }
    editStudent(student, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield this.bcryptPass.hashPassword(student.password);
            const studentData = Object.assign(Object.assign({}, student), { password: hashedPassword });
            const updateStudents = yield this.studentRepository.editStudent(studentData, email);
            return updateStudents ? true : false;
        });
    }
}
exports.StudentService = StudentService;
