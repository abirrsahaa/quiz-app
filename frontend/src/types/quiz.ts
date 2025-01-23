export interface Question{
    question:string;
    options:{
        option:string;
        isCorrect:boolean;
    }[];
    correctAnswer:string; //0,1,2,3
    explanation:string;
}

export interface Topic {
  _id: string;
  name: string;
  description: string;
  questions: string[];
}

export interface Chapter {
  _id: string;
  name: string;
  description: string;
  topics: Topic[];
}

export interface Subject {
  _id: string;
  name: string;
  description: string;
  chapters: Chapter[];
}

export type ExamType = {
  _id: string;
  name: string;
  description: string;
  image: string;
  subjects: Subject[];
  duration: number;
  question_count: number;
  __v?: number;
};
  
  export type QuizMode = 'exam' | 'chapter' | 'topic';
  
  export type Difficulty = 'beginner' | 'intermediate' | 'advanced';