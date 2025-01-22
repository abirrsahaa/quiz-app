"use strict";
// !isme bhi naam hoga , chapters ke reference ka array rhega , 
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SubjectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    chapters: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Chapter' }]
});
const Subject = mongoose_1.models.Subject || (0, mongoose_1.model)('Subject', SubjectSchema);
exports.default = Subject;
