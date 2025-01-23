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
exports.default = mongoose_1.models.subjects || (0, mongoose_1.model)('subjects', SubjectSchema);
