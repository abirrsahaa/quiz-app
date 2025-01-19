"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const ws_1 = require("ws");
const QuizManager_1 = require("./QuizManager");
const question_1 = __importDefault(require("./db/question"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const server = (0, http_1.createServer)(app);
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.post('/question', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("the body received is",req);
    try {
        const { questions } = req.body;
        console.log("the body received is", questions);
        questions.forEach((question) => __awaiter(void 0, void 0, void 0, function* () {
            const naya = yield new question_1.default(question);
            console.log("the question is", naya);
            yield naya.save();
        }));
        res.status(200).send("Question created successfully");
    }
    catch (err) {
        console.log("there was an error in creating the question", err);
        res.status(500).send(err);
    }
}));
const quizManager = new QuizManager_1.QuizManager();
const ws = new ws_1.WebSocketServer({ server });
ws.on("connection", (socket) => {
    console.log('Client connected');
    socket.send(JSON.stringify({
        type: "SERVER_CONNECTED",
        message: "You are connected to the server",
        socket: socket
    }));
    quizManager.addUser(socket);
});
server.listen(8080, () => {
    console.log('Server is running on port 8080');
});
