import { IquestionMetric } from "../db/questionmetrics";

export default async function UpdateMetrics(question: IquestionMetric, allQuestions: IquestionMetric[]): Promise<void> {
    // Basic metrics calculation with safety checks
    const totalAttempts = Math.max(0, question.total_attempts || 0);
    const correct = Math.max(0, question.correct || 0);
    const incorrect = Math.max(0, question.incorrect || 0);

    // Bayesian estimation
    const alpha = correct + 1;
    const beta = incorrect + 1;
    question.mastery_probability = Math.min(1, Math.max(0, alpha / (alpha + beta)));
    question.difficulty_score = Math.min(1, Math.max(0, 1 - question.mastery_probability));
    question.confidence_interval = Math.min(1, Math.max(0, 
        calculateConfidenceInterval(correct, totalAttempts)
    ));

    // Get attempt statistics
    const attemptStats = getAttemptStats(allQuestions);
    
    // Calculate base score from mastery and confidence
    const masteryComponent = calculateMasteryComponent(question.mastery_probability);
    const confidenceComponent = 1 - question.confidence_interval;
    
    // Calculate attempt balance with strict enforcement
    const attemptBalanceFactor = calculateStrictAttemptBalance(
        totalAttempts,
        attemptStats,
        3  // Maximum allowed attempt difference
    );

    // Time factor to prevent rapid repetition
    const timeFactor = calculateTimeFactor(question.lastShown);

    // Final recommendation calculation
    // If attempts are too high compared to minimum, severely penalize
    if (attemptBalanceFactor === 0) {
        question.recommendation_ratio = 0.1; // Very low priority
    } else {
        const baseScore = (
            masteryComponent * 0.3 +          // Mastery need
            confidenceComponent * 0.2 +       // Confidence in assessment
            attemptBalanceFactor * 0.4 +      // Attempt balance (highest weight)
            timeFactor * 0.1                  // Time factor
        );
        
        question.recommendation_ratio = Math.min(1, Math.max(0, baseScore));
    }

    await question.save();
}

function getAttemptStats(questions: IquestionMetric[]): { min: number; max: number; avg: number } {
    const attempts = questions.map(q => Math.max(0, q.total_attempts || 0));
    return {
        min: Math.min(...attempts),
        max: Math.max(...attempts),
        avg: attempts.reduce((a, b) => a + b, 0) / attempts.length
    };
}

function calculateStrictAttemptBalance(
    attempts: number,
    stats: { min: number; max: number; avg: number },
    maxDifference: number
): number {
    // If this question has more than maxDifference attempts above minimum
    if (attempts - stats.min > maxDifference) {
        return 0; // Complete penalty
    }

    // Calculate how close we are to the maximum allowed attempts
    const maxAllowedAttempts = stats.min + maxDifference;
    const attemptsRemaining = maxAllowedAttempts - attempts;

    // Higher score for questions with fewer attempts
    const balanceFactor = attemptsRemaining / maxDifference;

    // Add bonus for questions below average
    const belowAverageBonus = attempts < stats.avg ? 0.2 : 0;

    return Math.min(1, Math.max(0, balanceFactor + belowAverageBonus));
}

function calculateMasteryComponent(masteryProbability: number): number {
    const MASTERY_THRESHOLD = 0.8;
    
    if (masteryProbability >= MASTERY_THRESHOLD) {
        return 0.1; // Very low priority for mastered questions
    }
    
    // Higher priority for questions far from mastery
    return Math.min(1, Math.max(0, 
        1 - (masteryProbability / MASTERY_THRESHOLD)
    ));
}

function calculateTimeFactor(lastShown: Date): number {
    const now = new Date();
    const minutesSince = Math.max(0, (now.getTime() - lastShown.getTime()) / (1000 * 60));
    
    // Strong penalty for recently shown questions (within 5 minutes)
    if (minutesSince < 5) {
        return 0.1;
    }
    
    // Gradual increase up to 30 minutes
    return Math.min(1, minutesSince / 30);
}

function calculateConfidenceInterval(success: number, total: number): number {
    if (total === 0) return 1;
    
    const p = success / Math.max(1, total);
    const z = 1.96;
    const radicand = Math.max(0, (p * (1 - p) / Math.max(1, total)));
    return Math.min(1, Math.max(0, z * Math.sqrt(radicand)));
}