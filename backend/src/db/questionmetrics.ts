import { Document, model, models, Schema } from "mongoose";

// !question metrics mai bohot sare changes honge yeh pta hai mereko and yeh changes koi major nahi 
// !bss mujhe itna pata hai ke user info and unique quiz id rhega and yeh sarri milke question_attempted ke nam pe hoga 
// !sun le quiz_id hai na ak array hoga to store 

// !and quiz info mai bhi uss quiz related sabhi state dala jayega so relation uss hisab se banana hau

export interface IquestionMetric extends Document {
    question:Schema.Types.ObjectId;
    // student_id:Schema.Types.ObjectId;
    user_info:Schema.Types.ObjectId;
    total_attempts:number,
    lastShown: Date;
    lastAnswered: number;
    correct:number;
    incorrect:number;
    difficulty_score: number;
    confidence_interval: number;
    mastery_probability: number;
    recommendation_ratio: number;
  }

const QuestionMetricsSchema = new Schema({
    question:{ type: Schema.Types.ObjectId, ref: 'Question' },
    user_info:{type:Schema.Types.ObjectId,ref:'User'}, 
    total_attempts:{type:Number,default:0},
    lastShown:{ type: Date, default: Date.now },
    lastAnswered:{type:Number,default:-1},
    correct:{type:Number,default:0},
    incorrect:{type:Number,default:0},
    difficulty_score: { type: Number,default:0 }, //need to provide a default value
    confidence_interval: { type: Number, default:0}, //need to provide a default value
    mastery_probability: { type: Number,default:0 }, //need to provide a default value
    recommendation_ratio: { type: Number, default:0 }, //need to provide a default value
  });

  
  const QuestionAttempted = models.QuestionAttempted || model('QuestionAttempted', QuestionMetricsSchema);

  export default QuestionAttempted;