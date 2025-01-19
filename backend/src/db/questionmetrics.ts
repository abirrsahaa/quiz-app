import { Document, model, models, Schema } from "mongoose";

export interface IquestionMetric extends Document {
    question:Schema.Types.ObjectId;
    // student_id:Schema.Types.ObjectId;
    total_attempts:number,
    lastShown: Date;
    correct:number;
    incorrect:number;
    difficulty_score: number;
    confidence_interval: number;
    mastery_probability: number;
    recommendation_ratio: number;
  }

const QuestionMetricsSchema = new Schema({
    question:{ type: Schema.Types.ObjectId, ref: 'Question' },
    // student_id:{type:Schema.Types.ObjectId, ref:'Student'},
    // let here be the metrics 
    total_attempts:{type:Number,default:0},
    lastShown:{ type: Date, default: Date.now },
    correct:{type:Number,default:0},
    incorrect:{type:Number,default:0},
    difficulty_score: { type: Number,default:0 }, //need to provide a default value
    confidence_interval: { type: Number, default:0}, //need to provide a default value
    mastery_probability: { type: Number,default:0 }, //need to provide a default value
    recommendation_ratio: { type: Number, default:0 }, //need to provide a default value
  });

  
  const QuestionMetrics = models.QuestionMetrics || model('QuestionMetrics', QuestionMetricsSchema);

  export default QuestionMetrics;