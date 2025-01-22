"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    quiz_attempted: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'QuizInformation' }]
});
const User = mongoose_1.models.User || (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
