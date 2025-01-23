"use strict";
// !isme bhi naam hoga and topics ke refrence ka array hoga 
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChapterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    topics: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Topic' }]
});
exports.default = mongoose_1.models.chapters || (0, mongoose_1.model)('chapters', ChapterSchema);
