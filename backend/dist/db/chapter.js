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
const Chapter = mongoose_1.models.Chapter || (0, mongoose_1.model)('Chapter', ChapterSchema);
exports.default = Chapter;
