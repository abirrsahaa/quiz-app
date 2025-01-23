

// !exam mai kuch nhi bss iska nam chahiye tha mujhe and bss  subjects ke reference ka array rhega 

import { Document, model, models, Schema } from "mongoose";

export interface Iexam extends Document{
    subects:[Schema.Types.ObjectId];
    name:string;
    description:string;
    image:string;
    duration:number;
    question_count:number;
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
    image:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    question_count:{
        type:Number,
        required:true
    },
    subjects:[{type:Schema.Types.ObjectId,ref:'Subject'}]


})

export default models.exams || model('exams',ExamSchema);


// !question count 
// subjects[
// id
// name
// description
// chapters[
//     id 
//     name
//     description
//     topics[
//         id , 
//         name
//     ]
// ]]
