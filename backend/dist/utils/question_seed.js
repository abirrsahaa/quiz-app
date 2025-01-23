"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQuestionsForTopic = generateQuestionsForTopic;
exports.populateQuestions = populateQuestions;
const topic_1 = __importDefault(require("../db/topic"));
const question_1 = __importDefault(require("../db/question"));
const generateQuestions = {
    'Plant Kingdom Classification': [
        {
            question: "Which plant division is characterized by the presence of conducting tissues but no seeds?",
            options: [
                { option: "Pteridophyta", isCorrect: true },
                { option: "Bryophyta", isCorrect: false },
                { option: "Gymnosperms", isCorrect: false },
                { option: "Angiosperms", isCorrect: false }
            ],
            correctAnswer: "0",
            explanation: "Pteridophytes have vascular tissues (xylem and phloem) but reproduce via spores, not seeds."
        },
        {
            question: "Which group represents the most advanced plant division with enclosed seeds?",
            options: [
                { option: "Angiosperms", isCorrect: true },
                { option: "Gymnosperms", isCorrect: false },
                { option: "Pteridophytes", isCorrect: false },
                { option: "Bryophytes", isCorrect: false }
            ],
            correctAnswer: "0",
            explanation: "Angiosperms are the most evolutionarily advanced plants with enclosed seeds in ovaries."
        },
        {
            question: "Which characteristic distinguishes gymnosperms from other plant groups?",
            options: [
                { option: "Naked seeds", isCorrect: true },
                { option: "Lack of vascular tissues", isCorrect: false },
                { option: "Absence of roots", isCorrect: false },
                { option: "Spore reproduction", isCorrect: false }
            ],
            correctAnswer: "0",
            explanation: "Gymnosperms have seeds that are not enclosed in an ovary, hence called 'naked seeds'."
        },
        {
            question: "The first true land plants belong to which division?",
            options: [
                { option: "Bryophyta", isCorrect: true },
                { option: "Pteridophyta", isCorrect: false },
                { option: "Gymnosperms", isCorrect: false },
                { option: "Algae", isCorrect: false }
            ],
            correctAnswer: "0",
            explanation: "Bryophytes were the first plants to successfully colonize land, developing basic adaptations for terrestrial life."
        },
        {
            question: "Which plant group lacks true roots, stems, and leaves?",
            options: [
                { option: "Bryophytes", isCorrect: true },
                { option: "Pteridophytes", isCorrect: false },
                { option: "Gymnosperms", isCorrect: false },
                { option: "Angiosperms", isCorrect: false }
            ],
            correctAnswer: "0",
            explanation: "Bryophytes have simple, undifferentiated structures resembling roots, stems, and leaves but are not true botanical organs."
        }
        // Additional questions continue...
    ],
    'Photosynthesis': [
        {
            question: "In which part of the chloroplast does the light-independent reaction (Calvin cycle) occur?",
            options: [
                { option: "Stroma", isCorrect: true },
                { option: "Thylakoid membrane", isCorrect: false },
                { option: "Thylakoid lumen", isCorrect: false },
                { option: "Outer chloroplast membrane", isCorrect: false }
            ],
            correctAnswer: "0",
            explanation: "The Calvin cycle occurs in the stroma of chloroplasts, where CO2 is fixed into glucose using ATP and NADPH generated during light reactions."
        },
        {
            question: "Which pigment is primarily responsible for capturing light energy in photosynthesis?",
            options: [
                { option: "Chlorophyll a", isCorrect: true },
                { option: "Carotenoids", isCorrect: false },
                { option: "Xanthophylls", isCorrect: false },
                { option: "Phycobilins", isCorrect: false }
            ],
            correctAnswer: "0",
            explanation: "Chlorophyll a is the primary photosynthetic pigment that directly participates in light-dependent reactions."
        },
        {
            question: "What is the primary product of light-independent reactions?",
            options: [
                { option: "Glucose", isCorrect: true },
                { option: "Oxygen", isCorrect: false },
                { option: "ATP", isCorrect: false },
                { option: "NADPH", isCorrect: false }
            ],
            correctAnswer: "0",
            explanation: "The Calvin cycle produces glucose as the primary product through carbon fixation."
        }
        // Additional questions continue...
    ],
    // Other topics similarly expanded
    'Cell Structure': [
        {
            question: "Which cellular organelle is known as the 'powerhouse of the cell'?",
            options: [
                { option: "Mitochondria", isCorrect: true },
                { option: "Golgi apparatus", isCorrect: false },
                { option: "Endoplasmic reticulum", isCorrect: false },
                { option: "Nucleus", isCorrect: false }
            ],
            correctAnswer: "0",
            explanation: "Mitochondria are responsible for cellular respiration and ATP production, hence called the powerhouse of the cell."
        },
        {
            question: "Which organelle is responsible for protein modification and packaging?",
            options: [
                { option: "Golgi apparatus", isCorrect: true },
                { option: "Ribosomes", isCorrect: false },
                { option: "Endoplasmic reticulum", isCorrect: false },
                { option: "Lysosomes", isCorrect: false }
            ],
            correctAnswer: "0",
            explanation: "Golgi apparatus modifies, packages, and distributes proteins to various cellular destinations."
        }
        // Additional questions continue...
    ],
    'Nervous System': [
        {
            question: "Which type of neuron conducts impulses from the central nervous system to muscles?",
            options: [
                { option: "Motor neuron", isCorrect: true },
                { option: "Sensory neuron", isCorrect: false },
                { option: "Interneuron", isCorrect: false },
                { option: "Afferent neuron", isCorrect: false }
            ],
            correctAnswer: "0",
            explanation: "Motor neurons (efferent neurons) transmit signals from the central nervous system to effector organs like muscles and glands."
        },
        {
            question: "What is the functional unit of nervous system communication?",
            options: [
                { option: "Synapse", isCorrect: true },
                { option: "Neuron", isCorrect: false },
                { option: "Nerve fiber", isCorrect: false },
                { option: "Axon terminal", isCorrect: false }
            ],
            correctAnswer: "0",
            explanation: "Synapse is the junction between two neurons where neurotransmitters facilitate signal transmission."
        }
        // Additional questions continue...
    ]
};
// Function to generate questions for a specific topic
function generateQuestionsForTopic(topicName, count = 20) {
    const topicQuestions = generateQuestions[topicName] || [];
    // If fewer questions exist than requested, return all available
    if (topicQuestions.length <= count) {
        return topicQuestions;
    }
    // Randomly select specified number of questions
    const shuffled = topicQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
// Mongoose schema for questions (if not already defined)
// Function to populate questions for multiple topics
function populateQuestions(topics) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (const topic of topics) {
                const questions = generateQuestionsForTopic(topic.name);
                if (questions.length > 0) {
                    // Create questions with topic reference
                    const questionsToSave = questions.map(q => (Object.assign(Object.assign({}, q), { topic: topic._id })));
                    // Save questions and get their IDs
                    const savedQuestions = yield question_1.default.insertMany(questionsToSave);
                    const questionIds = savedQuestions.map(q => q._id);
                    // Update topic with question references
                    yield topic_1.default.findByIdAndUpdate(topic._id, { questions: questionIds }, { new: true });
                    console.log(`Populated ${questionIds.length} questions for topic: ${topic.name}`);
                }
            }
        }
        catch (error) {
            console.error('Error populating questions:', error);
            throw error;
        }
    });
}
