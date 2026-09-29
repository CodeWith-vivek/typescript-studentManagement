export interface Istudent{
    name:string,
    email:string,
    class:number,
    password:string,
    roleno:number
}

export interface IstudentRepository{
    createStudent(student:Istudent):Promise<Istudent>;
    findByEmail(email:string):Promise<Istudent|null>;
    editStudent(student:Istudent,email:string):Promise <Istudent|null>
}

export interface IstudentService{
    createStudent(student:Istudent):Promise<Istudent|boolean>;
    loginStudent(email:string,password:string):Promise <boolean | Istudent>
    findStudent(email:string):Promise <Istudent | null>
    editStudent(student:Istudent,email:string):Promise <Istudent |boolean>
}
