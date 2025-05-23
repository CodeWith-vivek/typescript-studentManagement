
import mongoose from 'mongoose';

import { Istudent } from '../interfaces/studentModelInterfaces';

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        email: {
            type: String,
            required: true,
          },
          class: {
            type: Number,
            required: true,
          },
          password: {
            type: String,
            required: true,
          }, roleno: {
            type: Number,
             required:true
            
          },
    },
    {timestamps:true}
);

const userModule = mongoose.model<Istudent>("user",UserSchema);
export default userModule;
