"use strict";
// isme db ko connect wala code likhio pehle 
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// and i guess http server bhi call karna pasdega for this use case
const QuestionSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true
    },
    options: [
        {
            _id: false,
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
});
const Question = mongoose_1.models.Question || (0, mongoose_1.model)('Question', QuestionSchema);
exports.default = Question;
