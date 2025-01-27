// !full on think as a teacher and how would the quiz look like


import mongoose from "mongoose";
import Question, { IQuestion } from "./db/question";
import QuestionAttempted from "./db/questionmetrics";
import exam from "./db/exam";
import chapter from "./db/chapter";

import topic from "./db/topic";
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


export class Quiz{

    public questions:any[];
    public activeQuestionNumber:number;
    public exam_mode:string;
    public subjectId:string;
    public chapterId:string;
    public topicId:string;
    public userId:string;
    public exam_id:string;

    constructor(){
        this.questions =[];
        this.activeQuestionNumber=0;
        this.exam_mode="";
        this.subjectId="";
        this.chapterId="";
        this.topicId="";
        this.exam_id="";
        this.userId="";
    }

      // !the 5 events that i have sort of mentioned here is 
            // !1. startQuiz
            // !2. endQuiz
            // !3. nextQuestion
            // !4. previousQuestion
            // !5. submitAnswer

        // !nothing just have functions for each of the events and call the functions from the quiz class
        nextQuestion(){
            // this.activeQuestionNumber++;
            // // add some validations
            // if(this.activeQuestionNumber>=this.questions.length){
            //     this.activeQuestionNumber=this.questions.length-1;
            //     // !send to the user that this was the last question 
            // }

            return this.questions[this.activeQuestionNumber];
        }
        change_mode(mode:string){
            this.exam_mode=mode;
            console.log("the mode is ",this.exam_mode);
        }
        change_subject(subjectId:string){
            this.subjectId=subjectId;
            console.log("the subject id is ",this.subjectId);
        }
        change_chapter(chapterId:string){
            this.chapterId=chapterId;
            console.log("the chapter id is ",this.chapterId);
        }
        change_topic(topicId:string){
            this.topicId=topicId;
            console.log("the topic id is ",this.topicId);
        }
        change_userId(userId:string){
            this.userId=userId;
            console.log("the user id is ",this.userId);
        }
        change_examId(examId:string){
            this.exam_id=examId;
            console.log("the exam id is ",this.exam_id);
        }

        async populateQuestions(userId:string){
            // !the fact that now i will have here the mode and based on it the question will be getting populated 
            const userObjectId = new mongoose.Types.ObjectId(userId);
            // !populate the questions from the db
            // !now set the conditions on how you are setting 
            // !as here i need to inject the metrics 
            // !lets put all the questions in the metrics
            // ------------------------------------------------
               //   !now that i have the unaswered 5 questions lets have 5 more from answered one
        // !now lets have the answered questions
        // !idhar question attempted wala collection hoga and i should get the object id of the user anyhow typecast it and then search with it else all of it is right 
        let answeredQuestions:any[]=[];
        let all_questions_db:IQuestion[]=[];
        let all_questions_db_id_strings:any[]=[];
        // abhi iss answeredQuestions ko on the basis of exam_mode pe set karna hai 
        if(this.exam_mode=="exam"){
            console.log("i am here in exam mode ");
            // !dekh question attempted will have only question info lets get all the attempted questions which the user has attempted 
            // !and then filter on the basis of what we have
            // !lets first get all the questions we can have in the set 
            // !then filter out the questions that are already there in the question bank
            const examObjectId = new mongoose.Types.ObjectId(this.exam_id);
            const exams = await exam.findOne({
                _id: examObjectId
                })
                   .populate({
                     path: 'subjects',
                     model: 'subjects',
                     populate: [{
                       path: 'chapters',
                       model: 'chapters',
                       populate: [{
                         path: 'topics',
                         model: 'topics',
                       }]
                     }]
            });
            // console.log("the topics are ",exams);
            // console.log("the subjects are ",exams.subjects[0].chapters);
            // lets get all the questions from the topics 
            
            exams.subjects.forEach((subject:any)=>{
                subject.chapters.forEach((chapter:any)=>{
                    chapter.topics.forEach((topic:any)=>{
                        all_questions_db.push(...topic.questions);
                    })
                })
            })
            // !here populating the question_db

            const all_questions_db_id=all_questions_db;
            all_questions_db_id_strings = all_questions_db_id.map(id => id.toString());
            const populatedQuestions = await Question.find({
                '_id': { $in: all_questions_db }
            });


            
            all_questions_db = populatedQuestions;

            console.log("the all questions db is ",all_questions_db);


            // !ab attempted mai kya bakchodi huya hai 
            const attemptedQuestions=await QuestionAttempted.find({
                user_info:userObjectId,
                total_attempts: { $gt: 0 } }).sort({recommendation_ratio:-1}).populate('question');
            
                const filter_questions = attemptedQuestions.filter((question: any) => {
                    const questionIdString = question.question._id.toString();
                    return all_questions_db_id_strings.includes(questionIdString);
                  });
            // picking out only 5 of those 
            if(filter_questions.length>5){
                answeredQuestions=filter_questions.slice(0,5);
            }else{
                answeredQuestions=filter_questions;
            }

            console.log("the answered questions are ",answeredQuestions);
        }
        if(this.exam_mode=="chapter"){
            // !dekh question attempted will have only question info lets get all the attempted questions which the user has attempted 
            // !and then filter on the basis of what we have
            // !lets first get all the questions we can have in the set 
            // !then filter out the questions that are already there in the question bank
            const chapterObjectId = new mongoose.Types.ObjectId(this.chapterId);
            const chapters =await chapter.findOne({
                _id: chapterObjectId
            }).populate([{
                path: 'topics',
                model: 'topics',
              }]);

              


            chapters.topics.forEach((topic:any)=>{
                all_questions_db.push(...topic.questions);
            })

            const all_questions_db_id=all_questions_db;
            all_questions_db_id_strings = all_questions_db_id.map(id => id.toString());

            console.log("the strings here what i have got is",all_questions_db_id_strings);

            const populatedQuestions = await Question.find({
                '_id': { $in: all_questions_db }
            });
            
            all_questions_db = populatedQuestions;

            console.log("the all questions db is ",all_questions_db);

            const attemptedQuestions=await QuestionAttempted.find({
                user_info:userObjectId,
                total_attempts: { $gt: 0 } }).sort({recommendation_ratio:-1}).populate('question');

                console.log("the attempted questions are ",attemptedQuestions);
            
                const filter_questions = attemptedQuestions.filter((question: any) => {
                    const questionIdString = question.question._id.toString();
                    return all_questions_db_id_strings.includes(questionIdString);
                  });
            // picking out only 5 of those 
            console.log("the filter questions are ",filter_questions);
            if(filter_questions.length>5){
                answeredQuestions=filter_questions.slice(0,5);
            }else{
                answeredQuestions=filter_questions;
            }
            console.log("the answered questions are ",answeredQuestions);

        }
        if(this.exam_mode=="topic"){
            // !dekh question attempted will have only question info lets get all the attempted questions which the user has attempted 
            // !and then filter on the basis of what we have
            // !lets first get all the questions we can have in the set 
            // !then filter out the questions that are already there in the question bank
            const topicObjectId = new mongoose.Types.ObjectId(this.topicId);
            const topics =await topic.findOne({
                _id: topicObjectId
            });

            all_questions_db.push(...topics.questions);
            const all_questions_db_id=all_questions_db;
            all_questions_db_id_strings = all_questions_db_id.map(id => id.toString());
            const populatedQuestions = await Question.find({
                '_id': { $in: all_questions_db }
            });

            
            
            all_questions_db = populatedQuestions;

            console.log("the all questions db is ",all_questions_db);
            // console.log("the user id is ",userObjectId);
            const attemptedQuestions=await QuestionAttempted.find({
                user_info:userObjectId,
                total_attempts: { $gt: 0 } }).sort({recommendation_ratio:-1}).populate('question');

            // console.log("the attempted questions are ",attemptedQuestions);
            
            const filter_questions = attemptedQuestions.filter((question: any) => {
                const questionIdString = question.question._id.toString();
                return all_questions_db_id_strings.includes(questionIdString);
              });

            console.log("the filter questions are ",filter_questions);
            // picking out only 5 of those 
            if(filter_questions.length>5){
                answeredQuestions=filter_questions.slice(0,5);
            }else{
                answeredQuestions=filter_questions;
            }
            console.log("the answered questions are ",answeredQuestions);
        }
       
        // console.log("the answered questions are which already have metrics i.e they have been answered",answeredQuestions);
        // !now filter out the questions that are already there in the question bank
        // !kyu ki hum same collection find kar rhe hai bhai mere
       
            // !first finding all the questions
            
            // !here i need to populate the questions on the basis of some weightage 
            // !first lets get the unanswered questions which will only get into injectable metrics 
// ! i have debugged until here 
            const getting_unanswered = async () => {
                const unanswered = await Promise.all(
                    all_questions_db.map(async (question: IQuestion) => {
                        console.log("the question id is ",question._id);
                        const ques = await QuestionAttempted.findOne({user_info:userObjectId, question: question._id });
                        console.log("the ques if found is ", ques);
                        if (!ques) {
                            return question;
                        }
                        return null;
                    })
                );

                // console.log("the unanswered questions in function are ",unanswered);
            
                // Filter out null values
                const filteredUnanswered = unanswered.filter((question) => question !== null) as IQuestion[];
                // console.log("the unanswered questions are ", filteredUnanswered);
                // console.log("the filtered unanswered questions are ",filteredUnanswered);
                return filteredUnanswered;

                
            };


            
            const unansweredQuestions: any[] = await getting_unanswered();
            // console.log("the unanswered questions are",unansweredQuestions);



            // !here selecting only 5 
            let injectableQuestions:IQuestion[]=[];
            if(unansweredQuestions.length>5){
                injectableQuestions=unansweredQuestions.slice(0,5);
            }else{
                injectableQuestions=unansweredQuestions;
            }


            //! here i am injecting the metrics in the questions
            const question_metrics = await Promise.all(
                injectableQuestions.map(async (question: IQuestion) => {
                    const ques = new QuestionAttempted({
                        user_info:userObjectId,
                        question: question._id
                    });
                    await ques.save();
                    await ques.populate('question');

                    return ques;
                })
            );
            
            // console.log("the questions which just got metrics are ", question_metrics);

        // !here also i am directly searching the db here also i need to give cases 
        const questionAttempted=await QuestionAttempted.find({user_info:userObjectId}).populate('question');
        const filtered=questionAttempted.filter((question:any)=>{
            const questionIdString = question.question._id.toString();
            return all_questions_db_id_strings.includes(questionIdString);
        })
        console.log("the filtered questions are ",filtered);
        const unanswered_question_metrics=filtered.filter((question:any)=>{
            return question.total_attempts==0;
        })
        console.log("the unanswered questions are ",unanswered_question_metrics);
        question_metrics.push(...unanswered_question_metrics);
        const combinedQuestions=question_metrics.concat(answeredQuestions);
        // now sort this on the basis of recommendation score
        // !this is the part where i am sorting 
        combinedQuestions.sort((a, b) => b.recommendation_ratio - a.recommendation_ratio );
        // !now push it in this.question if it is not already present 
        // !how to make sure i push only those questions which are not there from before
        // !i will check the question id
        // --------------------------------------
        // !this is a function i need to optimize i am going very high complexity here ~~
        // !i will do this in the next commit
        const questions_to_push = combinedQuestions.filter((question: any) => {
            return !this.questions.find((ques: any) => ques.question._id == question.question._id);
        });
        // console.log("the questions to push are ", questions_to_push);
        // console.log("the previous state of questions are ", this.questions);
        // !by now i am sure that i have a bunch of questions that i need to push it to the bank which is in memory
        this.questions=[...this.questions,...questions_to_push];
        // !isko bhi sort karde
        const difficulty_zero=this.questions.filter((question:any)=>{
            return question.recommendation_ratio==0;
        })
        // console.log("the difficulty zero questions are ",difficulty_zero);
        const difficulty_more=this.questions.filter((question:any)=>{
            return question.recommendation_ratio!==0;
        })
        // !sorting the difficulty more questions
        difficulty_more.sort((a:any,b:any)=>{
            return b.recommendation_ratio-a.recommendation_ratio;
        })
        // console.log("the difficulty more questions are ",difficulty_more);
        this.questions=[...difficulty_zero,...difficulty_more];

        console.log("now the state of the inmemory question bank is ",this.questions);
        }
        previousQuestion(){
            this.activeQuestionNumber--;
            // add some validations
            if(this.activeQuestionNumber<0){
                this.activeQuestionNumber=0;
                // !send to the user that this was the first question 
            }

            return this.questions[this.activeQuestionNumber];
            
        }

        submitAnswer(answer:string){
            // !check if the answer is correct or not 
            // !send the result to the user


            return this.nextQuestion();
            // return this.questions[this.activeQuestionNumber];

        }

        startQuiz(){
            return this.questions[this.activeQuestionNumber];
        }

        endQuiz(){
            // !send the result of the quiz to the user
        }

}