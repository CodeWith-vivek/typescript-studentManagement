
import { Iadmin } from "./adminModelInterface";
import { Istudent } from "./studentModelInterfaces";

export interface IadminRepository{

    findByEmail(email:string):Promise <Iadmin |null>
    findStudent():Promise <Istudent[] |null>
    findStudentByEmail(email:string):Promise<Istudent | null>
    edit(email:string,name:string,clas:number,roleno:number):Promise <Istudent |null>
    delete(email:string):Promise<Istudent|null>
    
}