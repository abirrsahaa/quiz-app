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
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./db/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("./mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
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
(0, mongoose_1.default)();
// @ts-ignore
app.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith('Bearer ')) {
            return res.status(401).send("Unauthorization header missing or invalid");
        }
        const token = header.split(' ')[1];
        console.log("the token received is", token);
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        catch (err) {
            console.error('Error verifying token:', err);
            return res.status(401).send('Invalid token');
        }
        console.log("the decoded token is", decoded);
        // @ts-ignore
        const email = decoded.email;
        console.log("the email received here is ", email);
        const user = yield user_1.default.findOne({
            email: email
        });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const user_response = {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        };
        return res.status(200).json({
            user: user_response
        });
    }
    catch (error) {
        console.log("there was an error in getting the user", error);
        return res.status(500).send("There was an error in getting the user");
    }
}));
// @ts-ignore   
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("the body received is", req.body);
        // !check kar ke iss email ka koi aur nahi hai na 
        const existing = yield user_1.default.findOne({
            email: req.body.email
        });
        if (existing) {
            return res.status(400).send("User already exists with the same email please include another email");
        }
        const hash = yield bcryptjs_1.default.hash(req.body.password, 10);
        console.log("the hash generated is", hash);
        const user = yield new user_1.default({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hash
        });
        console.log("the user created is", user);
        yield user.save();
        // !jwt create karna hai for token management and seamless login 
        // !jwt mai email rakh dunga wese bhi woh unique hai 
        console.log("the secret key is", process.env.JWT_SECRET);
        const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET);
        if (!token) {
            return res.status(500).send("Token could not be generated");
        }
        console.log("the token generated is", token);
        return res.status(200).json({
            token: token,
            success: true,
            user: user
        });
        // !agar nahi hai toh valid user hai password hash karke entry create kar 
        // !jwt create karke bhej de and token banana hai toh woh bhi bana de 
    }
    catch (error) {
        console.log("there was an error in creating the user", error);
        return res.status(500).send;
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
