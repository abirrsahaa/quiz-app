"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const QuestionMetricsSchema = new mongoose_1.Schema({
    question: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Question' },
    // student_id:{type:Schema.Types.ObjectId, ref:'Student'},
    // let here be the metrics 
    total_attempts: { type: Number, default: 0 },
    lastShown: { type: Date, default: Date.now },
    correct: { type: Number, default: 0 },
    incorrect: { type: Number, default: 0 },
    difficulty_score: { type: Number, default: 0 }, //need to provide a default value
    confidence_interval: { type: Number, default: 0 }, //need to provide a default value
    mastery_probability: { type: Number, default: 0 }, //need to provide a default value
    recommendation_ratio: { type: Number, default: 0 }, //need to provide a default value
});
const QuestionMetrics = mongoose_1.models.QuestionMetrics || (0, mongoose_1.model)('QuestionMetrics', QuestionMetricsSchema);
exports.default = QuestionMetrics;
