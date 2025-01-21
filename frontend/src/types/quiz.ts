export interface Question{
    question:string;
    options:{
        option:string;
        isCorrect:boolean;
    }[];
    correctAnswer:string; //0,1,2,3
    explanation:string;
}

export type ExamType = {
    id: string;
    name: string;
    description: string;
    image: string;
    subjects?: Subject[];
    duration?: number; // in minutes
    questionCount?: number;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
  };
  
  export type Subject = {
    id: string;
    name: string;
    topics?: Topic[];
  };
  
  export type Topic = {
    id: string;
    name: string;
  };
  
  export type QuizMode = 'exam' | 'chapter' | 'topic';
  
  export type Difficulty = 'beginner' | 'intermediate' | 'advanced';