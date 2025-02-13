import { WebSocket } from "ws";
import { Quiz } from "./Quiz";

import connectToMongo from "./mongoose";
import Question, { IQuestion } from "./db/question";
import QuestionMetrics, { IquestionMetric } from "./db/questionmetrics";
import UpdateMetrics from "./utils/metrics";
import { TopicMasteryDetermination } from "./utils/topic_mastery";
import QuestionAttempted from "./db/questionmetrics";
import mongoose from "mongoose";
import QuizInformation from "./db/quiz_info";
import User from "./db/user";


export class QuizManager{
    public QuizList: Quiz[] ;
    public userList:WebSocket[];
    public user:WebSocket | null;
    public activeQuiz:Quiz | null;
    public count_answered:number;

    constructor(){
        this.QuizList = [];
        this.userList = [];
        this.user = null;
        this.activeQuiz = null;
        this.count_answered=0;
    }

    addQuiz(quiz:Quiz){
        this.QuizList.push(quiz);
    }

    public addUser(user:WebSocket){
        this.user=user;
        this.userList.push(user);
        this.addHandlers(user);
    }

    private addHandlers(user:WebSocket){
        // every socket implementation on every event will be defined here 
        // !and the functioning will be defined in the quiz class 

        // !the 5 events that i have sort of mentioned here is 
            // !1. startQuiz
            // !2. endQuiz
            // !3. nextQuestion
            // !4. previousQuestion
            // !5. submitAnswer

        // !nothing just have functions for each of the events and call the functions from the quiz class

       user.on("message",async (message:string)=>{
            const data=JSON.parse(message);
            if(data.type=="START_QUIZ"){
                // this is when the quiz is started so here is the point
                // where i need to populate my question bank
                console.log("i am here in this ");
                // connectToMongo();
                this.activeQuiz=new Quiz();
                const userObjectId = new mongoose.Types.ObjectId(data.userId);
                const user_info=await User.findById(userObjectId);
                const naya_quiz=new QuizInformation({
                    user_info:userObjectId
                });
                await naya_quiz.save();

                await User.findByIdAndUpdate(userObjectId,{
                    $push:{
                        quiz_attempted:{
                            $each:[naya_quiz._id],
                            $sort:{
                                date:-1
                            }
                        }
                    }
                },
            {new:true});

                console.log("the quiz info is ",naya_quiz);
             

                this.activeQuiz.change_userId(data.userId);

                // !the fact that here we will be creating the cases of the 3 types of quiz generation 


                this.activeQuiz.change_mode(data.params.mode);
                if(data.params.mode=="exam"){
                    this.activeQuiz.change_examId(data.params.examId);
                }
                if(data.params.mode=="chapter"){
                    this.activeQuiz.change_examId(data.params.examId);
                    this.activeQuiz.change_subject(data.params.subjectId);
                    this.activeQuiz.change_chapter(data.params.chapterId);
                }
                if(data.params.mode=="topic"){
                    this.activeQuiz.change_examId(data.params.examId);
                    this.activeQuiz.change_subject(data.params.subjectId);
                    this.activeQuiz.change_chapter(data.params.chapterId);
                    this.activeQuiz.change_topic(data.params.topicId);
                }
                await this.activeQuiz.populateQuestions(data.userId);
                // console.log("the thisquestion here is after ",this.activeQuiz.questions);
                if(this.activeQuiz){
                    const question=this.activeQuiz.startQuiz();
                    console.log("the question received here is of the format",question);

                    user.send(JSON.stringify({
                        type:"QUIZ_STARTED",
                        message:"Quiz has started",
                        question:question?.question
                    }))
                }
            }else if(data.type=="NEXT_QUESTION"){
                if(this.activeQuiz){
                    const question=this.activeQuiz.nextQuestion();
                    user.send(JSON.stringify({
                        type:"NEXT_QUESTION",
                        message:"Next question",
                        question:question?.question
                    }))
                }
            }
            else if(data.type=="PREVIOUS_QUESTION"){
                if(this.activeQuiz){
                    const question=this.activeQuiz.previousQuestion();
                    user.send(JSON.stringify({
                        type:"PREVIOUS_QUESTION",
                        message:"Previous question",
                        question:question?.question
                    }))
                }
            }
            else if(data.type=="SUBMIT_ANSWER"){
                if(this.activeQuiz){
                    const question=this.activeQuiz.submitAnswer(data.answer);
                    user.send(JSON.stringify({
                        type:"SUBMIT_ANSWER",
                        message:"Answer submitted",
                        question:question?.question
                    }))
                }
            }
            else if(data.type=="ANSWERED"){

                // !dissect this part this might be causing the issue
                if(this.activeQuiz){
                    const question_received:IQuestion=data?.question;
                    const userObjectId = new mongoose.Types.ObjectId(data.userId);
                    console.log("the user id is ",userObjectId);
                    const question_db:IquestionMetric=await QuestionAttempted.findOne({user_info:userObjectId,question:question_received._id}) as IquestionMetric;
                    console.log("the question db is ",question_db);
                    // ab check karo ke shi hai ya galat hai 
                    // !this is also a unoptimized approach but i am focussing on the thing to work 
                    // !so i will optimize it later
                    // !remove the answered question from the inmemory question bank 
                    this.activeQuiz.questions=this.activeQuiz.questions.filter((question)=>{
                        if(question.question._id==question_received._id){
                            return false;
                        }else{
                            return true;
                        }
                    })
                    // !update the count as one is answered
                    this.count_answered++;
                    question_db.total_attempts++;
                    question_db.lastShown=new Date();
                    question_db.lastAnswered=data.answer;
                    
                    if(question_received.correctAnswer==data.answer){
                        question_db.correct++;
                    }else{
                        question_db.incorrect++;
                    
                    }


                    const user=await User.findById(userObjectId);
                    await QuizInformation.findByIdAndUpdate(user.quiz_attempted[0],{
                        $push:{
                            question_attempted:{
                                $each:[question_db._id],
                            }
                        }
                    },
                    {new:true});




                    // !one important thing here all questions mai current question inlcude nahi kar rha hi 


                    await UpdateMetrics(question_db,this.activeQuiz.questions);

                    const masteryChecker = new TopicMasteryDetermination();
                    const masteryStatus = masteryChecker.determineMastery(this.activeQuiz.questions);

                    if (masteryStatus.achieved) {
                        // End quiz or proceed to next topic
                        // !here mai ak websocket message bhej sakta hu ke quiz has ended
                        console.log("the quiz has ended");
                        user.send(JSON.stringify({
                            type:"END_QUIZ",
                            message:"Quiz has ended",
                        }))
                        return;
                    } else {
                        // Use recommendations to guide further practice
                        // masteryStatus.recommendations.forEach(rec => {
                        //     // Present recommendations to user
                        // });
                         // !do the infinite quiz part whenever it hits 5
                        if(this.count_answered==3){
                            this.activeQuiz.populateQuestions(data.userId);
                            this.count_answered=0;
                            console.log("i got called for infinite quiz");
                            console.log("the length for the inmemory question bank is ",this.activeQuiz.questions.length);
                        }
                    }
                   
                 
       
                }
            }
            else if(data.type=="END_QUIZ"){
                if(this.activeQuiz){
                    this.activeQuiz.endQuiz();
                    user.send(JSON.stringify({
                        type:"END_QUIZ",
                        message:"Quiz has ended",
                    }))
                }
            }
        });
    }


}