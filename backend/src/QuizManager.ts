import { WebSocket } from "ws";
import { Quiz } from "./Quiz";


export class QuizManager{
    public QuizList: Quiz[] ;
    public userList:WebSocket[];
    public user:WebSocket | null;
    public activeQuiz:Quiz | null;

    constructor(){
        this.QuizList = [];
        this.userList = [];
        this.user = null;
        this.activeQuiz = null;
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

       user.on("message",(message:string)=>{
            const data=JSON.parse(message);
            if(data.type=="START_QUIZ"){
                this.activeQuiz=new Quiz();
                if(this.activeQuiz){
                    const question=this.activeQuiz.startQuiz();
                    user.send(JSON.stringify({
                        type:"QUIZ_STARTED",
                        message:"Quiz has started",
                        question:question
                    }))
                }
            }else if(data.type=="NEXT_QUESTION"){
                if(this.activeQuiz){
                    const question=this.activeQuiz.nextQuestion();
                    user.send(JSON.stringify({
                        type:"NEXT_QUESTION",
                        message:"Next question",
                        question:question
                    }))
                }
            }
            else if(data.type=="PREVIOUS_QUESTION"){
                if(this.activeQuiz){
                    const question=this.activeQuiz.previousQuestion();
                    user.send(JSON.stringify({
                        type:"PREVIOUS_QUESTION",
                        message:"Previous question",
                        question:question
                    }))
                }
            }
            else if(data.type=="SUBMIT_ANSWER"){
                if(this.activeQuiz){
                    const question=this.activeQuiz.submitAnswer(data.answer);
                    user.send(JSON.stringify({
                        type:"SUBMIT_ANSWER",
                        message:"Answer submitted",
                        question:question
                    }))
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