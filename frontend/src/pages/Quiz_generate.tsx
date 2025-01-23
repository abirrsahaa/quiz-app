import { useEffect, useState } from 'react';
import { QuizStepper } from '@/components/quiz/QuizStepper';
import { QuizMode, ExamType } from '@/types/quiz';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';


function QuizGenerate() {
  const [exams, setExams] = useState<ExamType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizParams, setQuizParams] = useState<{
    examId: string;
    mode: QuizMode;
    subjectId?: string;
    chapterId?: string;
    topicId?: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/get_edu_data");
        const data = await response.json();
        setExams(data.edu_info);
      } catch (error) {
        console.log("Error fetching data, using mock data instead:", error);
        // Convert mock data to match the new schema
        const convertedMockExams: ExamType[] = exams.map(exam => ({
          _id: exam._id,
          name: exam.name,
          description: exam.description,
          image: exam.image,
          duration: exam.duration || 180,
          question_count: exam.question_count || 65,
          subjects: exam.subjects || []
        }));
        setExams(convertedMockExams);
        toast({
          title: "Using Demo Data",
          description: "Connected to demo mode since the backend is not available.",
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleStartQuiz = (params: {
    examId: string;
    mode: QuizMode;
    subjectId?: string;
    chapterId?: string;
    topicId?: string;
  }) => {
    setQuizParams(params);
    setQuizStarted(true);
  };

  if (quizStarted && quizParams) {
    navigate('/quiz', { state: quizParams });
    return null;
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
        {!loading && exams.length > 0 && (
          <QuizStepper exams={exams} onStart={handleStartQuiz} />
        )}
      </main>
    </motion.div>
  );
}

export default QuizGenerate;