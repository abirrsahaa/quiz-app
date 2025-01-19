"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AnsweredSchema = new mongoose_1.Schema({
    question_answered: { type: mongoose_1.Schema.Types.ObjectId, ref: 'QuestionMetrics' },
});
const answered = mongoose_1.models.answered || (0, mongoose_1.model)('answered', AnsweredSchema);
exports.default = answered;
