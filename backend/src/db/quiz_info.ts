

import { Document,  model,  models, Schema } from "mongoose";


export interface Quiz_Info extends Document{
    // idhar toh iska id ayega 
    question_attempted_session:[Schema.Types.ObjectId];
    date:Date;
    user_info:Schema.Types.ObjectId;
}


const QuizInfo=new Schema({

    question_attempted_session:[{type:Schema.Types.ObjectId,ref:'QuestionAttempted'}],
    user_info:{type:Schema.Types.ObjectId,ref:'User'},
    date:{
        type:Date,
        default:Date.now
    }

})


const QuizInformation =models.QuizInformation || model('QuizInformation',QuizInfo);

export default QuizInformation;