import { Istudent } from "../student/student.interface";

export interface Iadmin{
    name:string,
    email:string,
    password:string,
}

export interface IadminRepository{
    findByEmail(email:string):Promise <Iadmin |null>
    findStudent():Promise <Istudent[] |null>
    findStudentByEmail(email:string):Promise<Istudent | null>
    edit(email:string,name:string,clas:number,roleno:number):Promise <Istudent |null>
    delete(email:string):Promise<Istudent|null>
}

export interface IadminService{
    LoginStudent(email:string,password:string):Promise<boolean | Iadmin>
    findStudent():Promise <Istudent[] | null>
    findStudentByEmail(email:string):Promise <Istudent |null>
    edit(email:string,name:string,clas:number,roleno:number):Promise<boolean>
    delete(email:string):Promise <boolean>
}
