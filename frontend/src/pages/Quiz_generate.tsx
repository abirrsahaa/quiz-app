import { useState } from 'react';
import { exams } from '@/data/mockData';
import { QuizStepper } from '@/components/quiz/QuizStepper';
import { QuizMode } from '@/types/quiz';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Quiz_generate() {
  const navigate = useNavigate();
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizParams, setQuizParams] = useState<{
    examId: string;
    mode: QuizMode;
    subjectId?: string;
    topicId?: string;
  } | null>(null);

  const handleStartQuiz = (params: {
    examId: string;
    mode: QuizMode;
    subjectId?: string;
    topicId?: string;
  }) => {
    setQuizParams(params);
    setQuizStarted(true);
  };

  if (quizStarted && quizParams) {
    // return (
    //   <motion.div
    //     initial={{ opacity: 0 }}
    //     animate={{ opacity: 1 }}
    //     className="min-h-screen bg-background p-6"
    //   >
    //     <div className="max-w-4xl mx-auto">
    //       <h1 className="text-4xl font-bold text-center mb-8">Quiz Started!</h1>
    //       <pre className="bg-muted p-4 rounded-lg">
    //         {JSON.stringify(quizParams, null, 2)}
    //       </pre>
    //     </div>
    //   </motion.div>
    // );
    navigate('/quiz');
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      <header className="text-center py-12 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <h1 className="text-4xl font-bold mb-4">Adaptive Learning Platform</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Enhance your learning journey with personalized quizzes tailored to your needs.
          Choose your exam, mode, and start practicing!
        </p>
      </header>
      
      <main>
        <QuizStepper exams={exams} onStart={handleStartQuiz} />
      </main>
    </motion.div>
  );
}

export default Quiz_generate;