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
exports.QuizManager = void 0;
const Quiz_1 = require("./Quiz");
const metrics_1 = __importDefault(require("./utils/metrics"));
const topic_mastery_1 = require("./utils/topic_mastery");
const questionmetrics_1 = __importDefault(require("./db/questionmetrics"));
const mongoose_1 = __importDefault(require("mongoose"));
const quiz_info_1 = __importDefault(require("./db/quiz_info"));
const user_1 = __importDefault(require("./db/user"));
class QuizManager {
    constructor() {
        this.QuizList = [];
        this.userList = [];
        this.user = null;
        this.activeQuiz = null;
        this.count_answered = 0;
    }
    addQuiz(quiz) {
        this.QuizList.push(quiz);
    }
    addUser(user) {
        this.user = user;
        this.userList.push(user);
        this.addHandlers(user);
    }
    addHandlers(user) {
        // every socket implementation on every event will be defined here 
        // !and the functioning will be defined in the quiz class 
        // !the 5 events that i have sort of mentioned here is 
        // !1. startQuiz
        // !2. endQuiz
        // !3. nextQuestion
        // !4. previousQuestion
        // !5. submitAnswer
        // !nothing just have functions for each of the events and call the functions from the quiz class
        user.on("message", (message) => __awaiter(this, void 0, void 0, function* () {
            const data = JSON.parse(message);
            if (data.type == "START_QUIZ") {
                // this is when the quiz is started so here is the point
                // where i need to populate my question bank
                console.log("i am here in this ");
                // connectToMongo();
                this.activeQuiz = new Quiz_1.Quiz();
                const userObjectId = new mongoose_1.default.Types.ObjectId(data.userId);
                const user_info = yield user_1.default.findById(userObjectId);
                const naya_quiz = new quiz_info_1.default({
                    user_info: userObjectId
                });
                yield naya_quiz.save();
                yield user_1.default.findByIdAndUpdate(userObjectId, {
                    $push: {
                        quiz_attempted: {
                            $each: [naya_quiz._id],
                            $sort: {
                                date: -1
                            }
                        }
                    }
                }, { new: true });
                console.log("the quiz info is ", naya_quiz);
                this.activeQuiz.change_userId(data.userId);
                // !the fact that here we will be creating the cases of the 3 types of quiz generation 
                this.activeQuiz.change_mode(data.params.mode);
                if (data.params.mode == "exam") {
                    this.activeQuiz.change_examId(data.params.examId);
                }
                if (data.params.mode == "chapter") {
                    this.activeQuiz.change_examId(data.params.examId);
                    this.activeQuiz.change_subject(data.params.subjectId);
                    this.activeQuiz.change_chapter(data.params.chapterId);
                }
                if (data.params.mode == "topic") {
                    this.activeQuiz.change_examId(data.params.examId);
                    this.activeQuiz.change_subject(data.params.subjectId);
                    this.activeQuiz.change_chapter(data.params.chapterId);
                    this.activeQuiz.change_topic(data.params.topicId);
                }
                yield this.activeQuiz.populateQuestions(data.userId);
                // console.log("the thisquestion here is after ",this.activeQuiz.questions);
                if (this.activeQuiz) {
                    const question = this.activeQuiz.startQuiz();
                    console.log("the question received here is of the format", question);
                    user.send(JSON.stringify({
                        type: "QUIZ_STARTED",
                        message: "Quiz has started",
                        question: question === null || question === void 0 ? void 0 : question.question
                    }));
                }
            }
            else if (data.type == "NEXT_QUESTION") {
                if (this.activeQuiz) {
                    const question = this.activeQuiz.nextQuestion();
                    user.send(JSON.stringify({
                        type: "NEXT_QUESTION",
                        message: "Next question",
                        question: question === null || question === void 0 ? void 0 : question.question
                    }));
                }
            }
            else if (data.type == "PREVIOUS_QUESTION") {
                if (this.activeQuiz) {
                    const question = this.activeQuiz.previousQuestion();
                    user.send(JSON.stringify({
                        type: "PREVIOUS_QUESTION",
                        message: "Previous question",
                        question: question === null || question === void 0 ? void 0 : question.question
                    }));
                }
            }
            else if (data.type == "SUBMIT_ANSWER") {
                if (this.activeQuiz) {
                    const question = this.activeQuiz.submitAnswer(data.answer);
                    user.send(JSON.stringify({
                        type: "SUBMIT_ANSWER",
                        message: "Answer submitted",
                        question: question === null || question === void 0 ? void 0 : question.question
                    }));
                }
            }
            else if (data.type == "ANSWERED") {
                // !dissect this part this might be causing the issue
                if (this.activeQuiz) {
                    const question_received = data === null || data === void 0 ? void 0 : data.question;
                    const userObjectId = new mongoose_1.default.Types.ObjectId(data.userId);
                    console.log("the user id is ", userObjectId);
                    const question_db = yield questionmetrics_1.default.findOne({ user_info: userObjectId, question: question_received._id });
                    console.log("the question db is ", question_db);
                    // ab check karo ke shi hai ya galat hai 
                    // !this is also a unoptimized approach but i am focussing on the thing to work 
                    // !so i will optimize it later
                    // !remove the answered question from the inmemory question bank 
                    this.activeQuiz.questions = this.activeQuiz.questions.filter((question) => {
                        if (question.question._id == question_received._id) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    });
                    // !update the count as one is answered
                    this.count_answered++;
                    question_db.total_attempts++;
                    question_db.lastShown = new Date();
                    question_db.lastAnswered = data.answer;
                    if (question_received.correctAnswer == data.answer) {
                        question_db.correct++;
                    }
                    else {
                        question_db.incorrect++;
                    }
                    const user = yield user_1.default.findById(userObjectId);
                    yield quiz_info_1.default.findByIdAndUpdate(user.quiz_attempted[0], {
                        $push: {
                            question_attempted: {
                                $each: [question_db._id],
                            }
                        }
                    }, { new: true });
                    // !one important thing here all questions mai current question inlcude nahi kar rha hi 
                    yield (0, metrics_1.default)(question_db, this.activeQuiz.questions);
                    const masteryChecker = new topic_mastery_1.TopicMasteryDetermination();
                    const masteryStatus = masteryChecker.determineMastery(this.activeQuiz.questions);
                    if (masteryStatus.achieved) {
                        // End quiz or proceed to next topic
                        // !here mai ak websocket message bhej sakta hu ke quiz has ended
                        console.log("the quiz has ended");
                        user.send(JSON.stringify({
                            type: "END_QUIZ",
                            message: "Quiz has ended",
                        }));
                        return;
                    }
                    else {
                        // Use recommendations to guide further practice
                        // masteryStatus.recommendations.forEach(rec => {
                        //     // Present recommendations to user
                        // });
                        // !do the infinite quiz part whenever it hits 5
                        if (this.count_answered == 3) {
                            this.activeQuiz.populateQuestions(data.userId);
                            this.count_answered = 0;
                            console.log("i got called for infinite quiz");
                            console.log("the length for the inmemory question bank is ", this.activeQuiz.questions.length);
                        }
                    }
                }
            }
            else if (data.type == "END_QUIZ") {
                if (this.activeQuiz) {
                    this.activeQuiz.endQuiz();
                    user.send(JSON.stringify({
                        type: "END_QUIZ",
                        message: "Quiz has ended",
                    }));
                }
            }
        }));
    }
}
exports.QuizManager = QuizManager;
