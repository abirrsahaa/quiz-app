// !isme bhi naam hoga , chapters ke reference ka array rhega , 

import { Document, model, models, Schema } from "mongoose";

export interface ISubject extends Document{
    chapters:[Schema.Types.ObjectId];
    name:string;
    description:string;

}

const SubjectSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    chapters:[{type:Schema.Types.ObjectId,ref:'Chapter'}]
})

export default models.subjects || model('subjects',SubjectSchema);