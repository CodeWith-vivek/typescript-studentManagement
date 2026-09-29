import { Iadmin } from "./admin.interface";

import { Istudent } from "../student/student.interface";
import { IadminRepository } from "./admin.interface";

import Admin from "./admin.model";
import Student from "../student/student.model";

export class AdminRepository implements IadminRepository{

    async findByEmail(email: string): Promise<Iadmin | null> {
        return await Admin.findOne({email})
    }
    async findStudent():Promise<Istudent[] |null>{
        return await Student.find();
    }
    async findStudentByEmail(email: string): Promise<Istudent | null> {
        return await Student.findOne({email});
    }
    async edit(email: string, name: string, clas: number, roleno: number): Promise<Istudent | null> {
        return await Student.findOneAndUpdate(
            {email},
            {
                name:name,
                class:clas,
                roleno:roleno
            },
            {new : true}
        );
    }
    async delete(email: string): Promise<Istudent | null> {
        return await Student.findOneAndDelete({email});
    }
    
}