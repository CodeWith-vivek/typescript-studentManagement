import mongoose from 'mongoose';

import { Iadmin } from '../interfaces/adminModelInterface';

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true
        },
    },
    {timestamps:true}
);

const userModule = mongoose.model<Iadmin>("admin",UserSchema);

export default userModule;