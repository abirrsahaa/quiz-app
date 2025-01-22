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

const Subject=models.Subject || model('Subject',SubjectSchema);

export default Subject;