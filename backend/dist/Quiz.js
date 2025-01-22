"use strict";
// !full on think as a teacher and how would the quiz look like
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
exports.Quiz = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const question_1 = __importDefault(require("./db/question"));
const questionmetrics_1 = __importDefault(require("./db/questionmetrics"));
// import QuestionMetrics, { IquestionMetric } from "./db/questionmetrics";
// !have a type for questions 
// interface Question{
//     question:string;
//     options:{
//         option:string;
//         isCorrect:boolean;
//     }[];
//     correctAnswer:string; //0,1,2,3
//     explanation:string; 
// }
// ! i feel like i need a interface for submission 
class Quiz {
    constructor() {
        this.questions = [];
        this.activeQuestionNumber = 0;
    }
    // !the 5 events that i have sort of mentioned here is 
    // !1. startQuiz
    // !2. endQuiz
    // !3. nextQuestion
    // !4. previousQuestion
    // !5. submitAnswer
    // !nothing just have functions for each of the events and call the functions from the quiz class
    nextQuestion() {
        // this.activeQuestionNumber++;
        // // add some validations
        // if(this.activeQuestionNumber>=this.questions.length){
        //     this.activeQuestionNumber=this.questions.length-1;
        //     // !send to the user that this was the last question 
        // }
        return this.questions[this.activeQuestionNumber];
    }
    populateQuestions(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
            // !populate the questions from the db
            // !now set the conditions on how you are setting 
            // !as here i need to inject the metrics 
            // !lets put all the questions in the metrics
            // ------------------------------------------------
            //   !now that i have the unaswered 5 questions lets have 5 more from answered one
            // !now lets have the answered questions
            // !idhar question attempted wala collection hoga and i should get the object id of the user anyhow typecast it and then search with it else all of it is right 
            const answeredQuestions = yield questionmetrics_1.default.find({
                user_info: userObjectId,
                total_attempts: { $gt: 0 }
            }).sort({ recommendation_ratio: -1 }).limit(5).populate('question');
            console.log("the answered questions are which already have metrics i.e they have been answered", answeredQuestions);
            // !now filter out the questions that are already there in the question bank
            // !kyu ki hum same collection find kar rhe hai bhai mere
            // !first finding all the questions
            const all_questions_db = yield question_1.default.find({});
            // !here i need to populate the questions on the basis of some weightage 
            // !first lets get the unanswered questions which will only get into injectable metrics 
            const getting_unanswered = () => __awaiter(this, void 0, void 0, function* () {
                const unanswered = yield Promise.all(all_questions_db.map((question) => __awaiter(this, void 0, void 0, function* () {
                    const ques = yield questionmetrics_1.default.findOne({ user_info: userObjectId, question: question._id });
                    console.log("the ques if found is ", ques);
                    if (!ques) {
                        return question;
                    }
                    return null;
                })));
                // Filter out null values
                const filteredUnanswered = unanswered.filter((question) => question !== null);
                console.log("the unanswered questions are ", filteredUnanswered);
                return filteredUnanswered;
            });
            const unansweredQuestions = yield getting_unanswered();
            // console.log("the unanswered questions are",unansweredQuestions);
            // !here selecting only 5 
            let injectableQuestions = [];
            if (unansweredQuestions.length > 5) {
                injectableQuestions = unansweredQuestions.slice(0, 5);
            }
            else {
                injectableQuestions = unansweredQuestions;
            }
            //! here i am injecting the metrics in the questions
            const question_metrics = yield Promise.all(injectableQuestions.map((question) => __awaiter(this, void 0, void 0, function* () {
                const ques = new questionmetrics_1.default({
                    user_info: userObjectId,
                    question: question._id
                });
                yield ques.save();
                yield ques.populate('question');
                console.log("the ques is ", ques);
                console.log("after populate is", ques);
                return ques;
            })));
            console.log("the questions which just got metrics are ", question_metrics);
            const unanswered_question_metrics = yield questionmetrics_1.default.find({ user_info: userObjectId, total_attempts: 0 }).populate('question');
            console.log("the unanswered questions are ", unanswered_question_metrics);
            question_metrics.push(...unanswered_question_metrics);
            const combinedQuestions = question_metrics.concat(answeredQuestions);
            // now sort this on the basis of recommendation score
            // !this is the part where i am sorting 
            combinedQuestions.sort((a, b) => b.recommendation_ratio - a.recommendation_ratio);
            // !now push it in this.question if it is not already present 
            // !how to make sure i push only those questions which are not there from before
            // !i will check the question id
            // --------------------------------------
            // !this is a function i need to optimize i am going very high complexity here ~~
            // !i will do this in the next commit
            const questions_to_push = combinedQuestions.filter((question) => {
                return !this.questions.find((ques) => ques.question._id == question.question._id);
            });
            console.log("the questions to push are ", questions_to_push);
            console.log("the previous state of questions are ", this.questions);
            // !by now i am sure that i have a bunch of questions that i need to push it to the bank which is in memory
            this.questions = [...this.questions, ...questions_to_push];
            // !isko bhi sort karde
            const difficulty_zero = this.questions.filter((question) => {
                return question.recommendation_ratio == 0;
            });
            console.log("the difficulty zero questions are ", difficulty_zero);
            const difficulty_more = this.questions.filter((question) => {
                return question.recommendation_ratio !== 0;
            });
            // !sorting the difficulty more questions
            difficulty_more.sort((a, b) => {
                return b.recommendation_ratio - a.recommendation_ratio;
            });
            console.log("the difficulty more questions are ", difficulty_more);
            this.questions = [...difficulty_zero, ...difficulty_more];
            console.log("now the state of the inmemory question bank is ", this.questions);
        });
    }
    previousQuestion() {
        this.activeQuestionNumber--;
        // add some validations
        if (this.activeQuestionNumber < 0) {
            this.activeQuestionNumber = 0;
            // !send to the user that this was the first question 
        }
        return this.questions[this.activeQuestionNumber];
    }
    submitAnswer(answer) {
        // !check if the answer is correct or not 
        // !send the result to the user
        return this.nextQuestion();
        // return this.questions[this.activeQuestionNumber];
    }
    startQuiz() {
        return this.questions[this.activeQuestionNumber];
    }
    endQuiz() {
        // !send the result of the quiz to the user
    }
}
exports.Quiz = Quiz;
