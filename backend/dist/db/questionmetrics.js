"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const QuestionMetricsSchema = new mongoose_1.Schema({
    question: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Question' },
    user_info: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    total_attempts: { type: Number, default: 0 },
    lastShown: { type: Date, default: Date.now },
    lastAnswered: { type: Number, default: -1 },
    correct: { type: Number, default: 0 },
    incorrect: { type: Number, default: 0 },
    difficulty_score: { type: Number, default: 0 }, //need to provide a default value
    confidence_interval: { type: Number, default: 0 }, //need to provide a default value
    mastery_probability: { type: Number, default: 0 }, //need to provide a default value
    recommendation_ratio: { type: Number, default: 0 }, //need to provide a default value
});
const QuestionAttempted = mongoose_1.models.QuestionAttempted || (0, mongoose_1.model)('QuestionAttempted', QuestionMetricsSchema);
exports.default = QuestionAttempted;
