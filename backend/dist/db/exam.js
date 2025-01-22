"use strict";
// !exam mai kuch nhi bss iska nam chahiye tha mujhe and bss  subjects ke reference ka array rhega 
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ExamSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subjects: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Subject' }]
});
const Exam = mongoose_1.models.Exam || (0, mongoose_1.model)('Exam', ExamSchema);
exports.default = Exam;
