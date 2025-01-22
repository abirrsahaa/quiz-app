

// !exam mai kuch nhi bss iska nam chahiye tha mujhe and bss  subjects ke reference ka array rhega 

import { Document, model, models, Schema } from "mongoose";

export interface Iexam extends Document{
    subects:[Schema.Types.ObjectId];
    name:string;
    description:string;
}

const ExamSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    subjects:[{type:Schema.Types.ObjectId,ref:'Subject'}]


})

const Exam=models.Exam || model('Exam',ExamSchema);

export default Exam;