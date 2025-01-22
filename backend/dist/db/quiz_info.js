"use strict";
// !ab mereko tu yeh bata tu unique id kese generate karega and kiss basis pe yeh data rakhega mujhe bata 
// !first of all chal web socket connection connect ho gaya hai and then tu quiz start kar raha hai very good 
// !but usi moment tumko ak id generate karna hai user ke details ke basis pe karna hai ya fir 
// !is pure route ko authorize kar de and whenever tu quiz_banata hai ak usko tu generate karke hai na apne user ke data_base mai dal de 
// !and uss quiz_info mai bhi user_info , and uss session mai jo jo bakchodi ki hai sabhi kacha chitha chahiye mujhe uss db ke collection mai mujhe 
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const QuizInfo = new mongoose_1.Schema({
    question_attempted_session: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'QuestionAttempted' }],
    user_info: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
});
const QuizInformation = mongoose_1.models.QuizInformation || (0, mongoose_1.model)('QuizInformation', QuizInfo);
exports.default = QuizInformation;
