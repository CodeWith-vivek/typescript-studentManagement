import { Iadmin } from "./adminModelInterface";
import { Istudent } from "./studentModelInterfaces";


export interface IadminService{

    LoginStudent(email:string,password:string):Promise<boolean | Iadmin>
    findStudent():Promise <Istudent[] | null>
    findStudentByEmail(email:string):Promise <Istudent |null>
    edit(email:string,name:string,clas:number,roleno:number):Promise<boolean>
    delete(email:string):Promise <boolean>
    
}