// !isme naam hoga bss aur kuch nhi chahiye 

import { Document, model, models, Schema } from "mongoose";

export interface ITopic extends Document{
    name:string;
    description:string;
    questions:[Schema.Types.ObjectId];
}

const TopicSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    questions:[{type:Schema.Types.ObjectId,ref:'Question'}]

})


export default models.topics || model('topics', TopicSchema);