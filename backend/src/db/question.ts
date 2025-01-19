// isme db ko connect wala code likhio pehle 

import { Document, model, models, Schema } from "mongoose";

export interface IQuestion extends Document{ 
    question:string;
    options:{
        option:string;
        isCorrect:boolean;
    }[];
    correctAnswer:string; //0,1,2,3
    explanation:string;
}

// and i guess http server bhi call karna pasdega for this use case


const QuestionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: [
        {
            _id:false,
            option: {
                
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true
            }
        }
    ],
    correctAnswer: {
        type: String,
        required: true
    },
    explanation: {
        type: String,
        required: true
    }

})


const Question =models.Question || model('Question',QuestionSchema);

export default Question;