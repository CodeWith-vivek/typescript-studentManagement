
import { Iadmin } from "./admin.interface";
import { Istudent } from "../student/student.interface";

import { IadminRepository } from "./admin.interface";
import { BcryptPass } from "../../shared/utils/password.util";
import { IadminService } from "./admin.interface";

export class AdminService implements IadminService{
    private adminRepository:IadminRepository;
    private bcryptPass:BcryptPass;
    constructor(adminRepository:IadminRepository){
        this.adminRepository = adminRepository;
        this.bcryptPass = new BcryptPass();
    }

    async LoginStudent(email: string, password: string): Promise<boolean | Iadmin> {
        const findByEmail = await this.adminRepository.findByEmail(email);

        if(findByEmail){
            const isPasswordMatch = await this.bcryptPass.comparePassword(password,findByEmail.password);
            if(isPasswordMatch){
                return findByEmail;
            }else{
                return false;
            }

        }else{
            return false;
        }
    }

    async findStudent(): Promise<Istudent[] | null> {
        const findStudents = await this.adminRepository.findStudent();

        if(findStudents){
            return findStudents
        }
        return null;
    }


    async findStudentByEmail(email: string): Promise<Istudent | null> {
        const findStudents = await this.adminRepository.findStudentByEmail(email);
        if(findStudents){
            return findStudents
        }else{
            return null;
        }
    }
    async edit(email: string, name: string, clas: number, roleno: number): Promise <boolean> {
        const findStudent = await this.adminRepository.edit(email,name,clas,roleno);
        if(findStudent){
            return true;
        }else{
            return false;
        }
    }

    async delete(email: string): Promise <boolean> {
        const findStudent = await this.adminRepository.delete(email);
        if(findStudent){
            return true;
        }else{
            return false;
        }
    }
}