// !isme bhi naam hoga and topics ke refrence ka array hoga 

import { Document, model, models, Schema } from "mongoose";


export interface IChapter extends Document{
    topics:[Schema.Types.ObjectId];
    name:string;
    description:string;
}


const ChapterSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    topics:[{type:Schema.Types.ObjectId,ref:'Topic'}]
})

export default models.chapters || model('chapters',ChapterSchema);