// !full on think as a teacher and how would the quiz look like

// !have a type for questions 

interface Question{
    question:string;
    options:{
        option:string;
        isCorrect:boolean;
    }[];
    correctAnswer:string; //0,1,2,3
    explanation:string; 
}

// ! i feel like i need a interface for submission 


export class Quiz{

    public questions:Question[];
    public activeQuestionNumber:number;

    constructor(){
        this.questions = [
            {
                question: "Which planet is known as the Red Planet?",
                options: [
                    { option: "Venus", isCorrect: false },
                    { option: "Mars", isCorrect: true },
                    { option: "Jupiter", isCorrect: false },
                    { option: "Saturn", isCorrect: false }
                ],
                correctAnswer: "1",
                explanation: "Mars is known as the Red Planet due to its reddish appearance."
            },
            {
                question: "What is the chemical symbol for gold?",
                options: [
                    { option: "Ag", isCorrect: false },
                    { option: "Fe", isCorrect: false },
                    { option: "Au", isCorrect: true },
                    { option: "Cu", isCorrect: false }
                ],
                correctAnswer: "2",
                explanation: "The chemical symbol for gold is Au, derived from its Latin name 'Aurum'."
            },
            {
                question: "Which programming language was created by Brendan Eich?",
                options: [
                    { option: "Python", isCorrect: false },
                    { option: "Java", isCorrect: false },
                    { option: "C++", isCorrect: false },
                    { option: "JavaScript", isCorrect: true }
                ],
                correctAnswer: "3",
                explanation: "Brendan Eich created JavaScript in 1995 while working at Netscape."
            },
            {
                question: "What is the capital of Japan?",
                options: [
                    { option: "Tokyo", isCorrect: true },
                    { option: "Seoul", isCorrect: false },
                    { option: "Beijing", isCorrect: false },
                    { option: "Bangkok", isCorrect: false }
                ],
                correctAnswer: "0",
                explanation: "Tokyo is the capital city of Japan."
            },
            {
                question: "Which of these is not a primary color?",
                options: [
                    { option: "Red", isCorrect: false },
                    { option: "Blue", isCorrect: false },
                    { option: "Green", isCorrect: true },
                    { option: "Yellow", isCorrect: false }
                ],
                correctAnswer: "2",
                explanation: "Green is not a primary color; the primary colors are red, blue, and yellow."
            },
            {
                question: "What is the largest mammal in the world?",
                options: [
                    { option: "African Elephant", isCorrect: false },
                    { option: "Blue Whale", isCorrect: true },
                    { option: "Giraffe", isCorrect: false },
                    { option: "Polar Bear", isCorrect: false }
                ],
                correctAnswer: "1",
                explanation: "The Blue Whale is the largest mammal in the world."
            }
        ];
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
            this.activeQuestionNumber++;
            // add some validations
            if(this.activeQuestionNumber>=this.questions.length){
                this.activeQuestionNumber=this.questions.length-1;
                // !send to the user that this was the last question 
            }

            return this.questions[this.activeQuestionNumber];
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