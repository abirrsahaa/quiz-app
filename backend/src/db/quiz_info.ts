// !ab mereko tu yeh bata tu unique id kese generate karega and kiss basis pe yeh data rakhega mujhe bata 
// !first of all chal web socket connection connect ho gaya hai and then tu quiz start kar raha hai very good 
// !but usi moment tumko ak id generate karna hai user ke details ke basis pe karna hai ya fir 
// !is pure route ko authorize kar de and whenever tu quiz_banata hai ak usko tu generate karke hai na apne user ke data_base mai dal de 
// !and uss quiz_info mai bhi user_info , and uss session mai jo jo bakchodi ki hai sabhi kacha chitha chahiye mujhe uss db ke collection mai mujhe 

import { Document,  model,  models, Schema } from "mongoose";


export interface Quiz_Info extends Document{
    // idhar toh iska id ayega 
    question_attempted_session:[Schema.Types.ObjectId];
    user_info:Schema.Types.ObjectId;
}


const QuizInfo=new Schema({

    question_attempted_session:[{type:Schema.Types.ObjectId,ref:'QuestionAttempted'}],
    user_info:{type:Schema.Types.ObjectId,ref:'User'},

})


const QuizInformation =models.QuizInformation || model('QuizInformation',QuizInfo);

export default QuizInformation;