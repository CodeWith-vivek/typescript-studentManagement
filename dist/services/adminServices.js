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
exports.AdminService = void 0;
const bcrypt_1 = require("../utils/bcrypt");
class AdminService {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
        this.bcryptPass = new bcrypt_1.BcryptPass();
    }
    LoginStudent(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const findByEmail = yield this.adminRepository.findByEmail(email);
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
    findStudent() {
        return __awaiter(this, void 0, void 0, function* () {
            const findStudents = yield this.adminRepository.findStudent();
            if (findStudents) {
                return findStudents;
            }
            return null;
        });
    }
    findStudentByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const findStudents = yield this.adminRepository.findStudentByEmail(email);
            if (findStudents) {
                return findStudents;
            }
            else {
                return null;
            }
        });
    }
    edit(email, name, clas, roleno) {
        return __awaiter(this, void 0, void 0, function* () {
            const findStudent = yield this.adminRepository.edit(email, name, clas, roleno);
            if (findStudent) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    delete(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const findStudent = yield this.adminRepository.delete(email);
            if (findStudent) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.AdminService = AdminService;
