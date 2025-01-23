"use strict";
// !isme naam hoga bss aur kuch nhi chahiye 
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TopicSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    questions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Question' }]
});
exports.default = mongoose_1.models.topics || (0, mongoose_1.model)('topics', TopicSchema);
