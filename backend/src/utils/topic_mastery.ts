import { Types } from 'mongoose';

// Update interface to match actual data structure
interface IquestionMetric {
    _id: { $oid: string };
    question: { $oid: string };
    total_attempts: number;
    correct: number;
    incorrect: number;
    difficulty_score: number;
    confidence_interval: number;
    mastery_probability: number;
    recommendation_ratio: number;
    lastShown: { $date: string };
    __v: number;
}

interface MasteryResult {
    achieved: boolean;
    metrics: {
        averageMasteryProbability: number;
        averageDifficulty: number;
        averageConfidence: number;
        correctPercentage: number;
        totalQuestions: number;
        attemptsDistribution: {
            min: number;
            max: number;
            avg: number;
        };
    };
    problemAreas: {
        lowAttempts: string[];
        highDifficulty: string[];
        lowMastery: string[];
        highUncertainty: string[];
        recentlyAttempted: string[];
    };
    recommendations: string[];
    debug?: any; // For debugging purposes
}

export class TopicMasteryDetermination {
    private readonly MASTERY_THRESHOLDS = {
        minMasteryProbability: 0.8,
        minAttemptsPerQuestion: 3,
        maxDifficultyScore: 0.35, // Adjusted based on your data
        minCorrectPercentage: 0.75,
        maxConfidenceInterval: 0.4, // Adjusted based on your data
        minTimeBetweenAttempts: 1, // Reduced to 1 minute for testing
        minQuestions: 4
    };

    public determineMastery(questions: IquestionMetric[]): MasteryResult {
        if (questions.length < this.MASTERY_THRESHOLDS.minQuestions) {
            return this.createResult(false, questions, ["Insufficient questions attempted"]);
        }

        const metrics = this.calculateMetrics(questions);
        const problemAreas = this.identifyProblemAreas(questions);
        const recommendations = this.generateRecommendations(metrics, problemAreas);

        const masteryAchieved = this.evaluateMastery(metrics, problemAreas);

        // Add debug information
        const debug = {
            thresholds: this.MASTERY_THRESHOLDS,
            rawMetrics: metrics,
            evaluationResults: {
                masteryProbCheck: metrics.averageMasteryProbability >= this.MASTERY_THRESHOLDS.minMasteryProbability,
                difficultyCheck: metrics.averageDifficulty <= this.MASTERY_THRESHOLDS.maxDifficultyScore,
                accuracyCheck: metrics.correctPercentage >= this.MASTERY_THRESHOLDS.minCorrectPercentage,
                confidenceCheck: metrics.averageConfidence <= this.MASTERY_THRESHOLDS.maxConfidenceInterval,
                attemptsCheck: problemAreas.lowAttempts.length === 0,
                recentAttemptsCheck: problemAreas.recentlyAttempted.length === 0,
                balanceCheck: this.checkAttemptBalance(metrics.attemptsDistribution)
            }
        };

        return {
            ...this.createResult(masteryAchieved, questions, recommendations),
            debug
        };
    }

    private calculateMetrics(questions: IquestionMetric[]) {
        const totalAttempts = questions.reduce((sum, q) => sum + q.total_attempts, 0);
        const totalCorrect = questions.reduce((sum, q) => sum + q.correct, 0);

        return {
            averageMasteryProbability: questions.reduce((sum, q) => sum + q.mastery_probability, 0) / questions.length,
            averageDifficulty: questions.reduce((sum, q) => sum + q.difficulty_score, 0) / questions.length,
            averageConfidence: questions.reduce((sum, q) => sum + q.confidence_interval, 0) / questions.length,
            correctPercentage: totalCorrect / totalAttempts,
            totalQuestions: questions.length,
            attemptsDistribution: this.getAttemptStats(questions)
        };
    }

    private getAttemptStats(questions: IquestionMetric[]) {
        const attempts = questions.map(q => q.total_attempts);
        return {
            min: Math.min(...attempts),
            max: Math.max(...attempts),
            avg: attempts.reduce((a, b) => a + b, 0) / attempts.length
        };
    }

    private identifyProblemAreas(questions: IquestionMetric[]) {
        const now = new Date();
        return {
            lowAttempts: questions
                .filter(q => q.total_attempts < this.MASTERY_THRESHOLDS.minAttemptsPerQuestion)
                .map(q => q.question.$oid),
            highDifficulty: questions
                .filter(q => q.difficulty_score > this.MASTERY_THRESHOLDS.maxDifficultyScore)
                .map(q => q.question.$oid),
            lowMastery: questions
                .filter(q => q.mastery_probability < this.MASTERY_THRESHOLDS.minMasteryProbability)
                .map(q => q.question.$oid),
            highUncertainty: questions
                .filter(q => q.confidence_interval > this.MASTERY_THRESHOLDS.maxConfidenceInterval)
                .map(q => q.question.$oid),
            recentlyAttempted: questions
                .filter(q => {
                    const lastShown = new Date(q.lastShown.$date);
                    const minutesSince = (now.getTime() - lastShown.getTime()) / (1000 * 60);
                    return minutesSince < this.MASTERY_THRESHOLDS.minTimeBetweenAttempts;
                })
                .map(q => q.question.$oid)
        };
    }

    private evaluateMastery(
        metrics: MasteryResult['metrics'],
        problemAreas: MasteryResult['problemAreas']
    ): boolean {
        return (
            metrics.averageMasteryProbability >= this.MASTERY_THRESHOLDS.minMasteryProbability &&
            metrics.averageDifficulty <= this.MASTERY_THRESHOLDS.maxDifficultyScore &&
            metrics.correctPercentage >= this.MASTERY_THRESHOLDS.minCorrectPercentage &&
            metrics.averageConfidence <= this.MASTERY_THRESHOLDS.maxConfidenceInterval &&
            problemAreas.lowAttempts.length === 0 &&
            problemAreas.recentlyAttempted.length === 0 &&
            this.checkAttemptBalance(metrics.attemptsDistribution)
        );
    }

    private checkAttemptBalance(attempts: { min: number; max: number; avg: number }): boolean {
        return (attempts.max - attempts.min) <= 2; // Allow maximum 2 attempts difference
    }

    private generateRecommendations(
        metrics: MasteryResult['metrics'],
        problemAreas: MasteryResult['problemAreas']
    ): string[] {
        const recommendations: string[] = [];

        if (problemAreas.lowAttempts.length > 0) {
            recommendations.push(`Need more attempts on ${problemAreas.lowAttempts.length} questions`);
        }

        if (problemAreas.highDifficulty.length > 0) {
            recommendations.push(`Review concepts for ${problemAreas.highDifficulty.length} challenging questions`);
        }

        if (problemAreas.lowMastery.length > 0) {
            recommendations.push(`Focus on improving mastery for ${problemAreas.lowMastery.length} questions`);
        }

        if (problemAreas.highUncertainty.length > 0) {
            recommendations.push(`More consistent performance needed on ${problemAreas.highUncertainty.length} questions`);
        }

        if (problemAreas.recentlyAttempted.length > 0) {
            recommendations.push(`Wait before attempting ${problemAreas.recentlyAttempted.length} recently practiced questions`);
        }

        if (metrics.correctPercentage < this.MASTERY_THRESHOLDS.minCorrectPercentage) {
            recommendations.push(`Overall accuracy needs improvement (current: ${(metrics.correctPercentage * 100).toFixed(1)}%)`);
        }

        return recommendations;
    }

    private createResult(
        achieved: boolean,
        questions: IquestionMetric[],
        recommendations: string[]
    ): MasteryResult {
        const metrics = this.calculateMetrics(questions);
        const problemAreas = this.identifyProblemAreas(questions);

        return {
            achieved,
            metrics,
            problemAreas,
            recommendations
        };
    }
}