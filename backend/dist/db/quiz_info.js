"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const QuizInfo = new mongoose_1.Schema({
    question_attempted_session: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'QuestionAttempted' }],
    user_info: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    date: {
        type: Date,
        default: Date.now
    }
});
const QuizInformation = mongoose_1.models.QuizInformation || (0, mongoose_1.model)('QuizInformation', QuizInfo);
exports.default = QuizInformation;
