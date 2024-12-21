export interface Question{
    question:string;
    options:{
        option:string;
        isCorrect:boolean;
    }[];
    correctAnswer:string; //0,1,2,3
    explanation:string;
}