import { Document, model, models, Schema } from "mongoose";


export interface IUser extends Document{
    first_name:string;
    last_name:string;
    email:string;
    password:string;
}


const UserSchema=new Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    quiz_attempted:[{type:Schema.Types.ObjectId,ref:'QuizInformation'}]
})


const User=models.User || model('User',UserSchema);

export default User;


