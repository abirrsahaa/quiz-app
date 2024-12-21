"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const ws_1 = require("ws");
const QuizManager_1 = require("./QuizManager");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
app.get('/', (req, res) => {
    res.send('Hello World');
});
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
