// !full on think as a teacher and how would the quiz look like


import Question, { IQuestion } from "./db/question";
import QuestionMetrics, { IquestionMetric } from "./db/questionmetrics";


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

    constructor(){
        this.questions =[];
        this.activeQuestionNumber=0;
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
        async populateQuestions(){
            // !populate the questions from the db
            // !now set the conditions on how you are setting 
            // !as here i need to inject the metrics 
            // !lets put all the questions in the metrics
            // ------------------------------------------------
               //   !now that i have the unaswered 5 questions lets have 5 more from answered one
        // !now lets have the answered questions
        const answeredQuestions:any[]=await QuestionMetrics.find({
            total_attempts: { $gt: 0 } }).sort({recommendation_ratio:-1}).limit(5).populate('question');
        console.log("the answered questions are which already have metrics i.e they have been answered",answeredQuestions);
        // !now filter out the questions that are already there in the question bank
        // !kyu ki hum same collection find kar rhe hai bhai mere
       
            // !first finding all the questions
            const all_questions_db:IQuestion[]=await Question.find({});
            // !here i need to populate the questions on the basis of some weightage 
            // !first lets get the unanswered questions which will only get into injectable metrics 

            const getting_unanswered = async () => {
                const unanswered = await Promise.all(
                    all_questions_db.map(async (question: IQuestion) => {
                        const ques = await QuestionMetrics.findOne({ question: question._id });
                        console.log("the ques if found is ", ques);
                        if (!ques) {
                            return question;
                        }
                        return null;
                    })
                );
            
                // Filter out null values
                const filteredUnanswered = unanswered.filter((question) => question !== null) as IQuestion[];
                console.log("the unanswered questions are ", filteredUnanswered);
                return filteredUnanswered;
            };
            
            const unansweredQuestions: IQuestion[] = await getting_unanswered();
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
                    const ques = new QuestionMetrics({
                        question: question._id
                    });
                    await ques.save();
                    await ques.populate('question');
                    console.log("the ques is ", ques);
                    console.log("after populate is", ques);
                    return ques;
                })
            );
            
            console.log("the questions which just got metrics are ", question_metrics);

           
        const unanswered_question_metrics=await QuestionMetrics.find({total_attempts:0}).populate('question');
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
        console.log("the questions to push are ", questions_to_push);
        console.log("the previous state of questions are ", this.questions);
        // !by now i am sure that i have a bunch of questions that i need to push it to the bank which is in memory
        this.questions=[...this.questions,...questions_to_push];
        // !isko bhi sort karde
        const difficulty_zero=this.questions.filter((question:any)=>{
            return question.recommendation_ratio==0;
        })
        console.log("the difficulty zero questions are ",difficulty_zero);
        const difficulty_more=this.questions.filter((question:any)=>{
            return question.recommendation_ratio!==0;
        })
        // !sorting the difficulty more questions
        difficulty_more.sort((a:any,b:any)=>{
            return b.recommendation_ratio-a.recommendation_ratio;
        })
        console.log("the difficulty more questions are ",difficulty_more);
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