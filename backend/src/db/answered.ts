import { Document, model, models, Schema } from "mongoose";


export interface IAnswered extends Document {
    question_answered:Schema.Types.ObjectId;
}

const AnsweredSchema = new Schema({
    question_answered:{type:Schema.Types.ObjectId,ref:'QuestionMetrics'},
})

const answered= models.answered || model('answered',AnsweredSchema);

export default answered;