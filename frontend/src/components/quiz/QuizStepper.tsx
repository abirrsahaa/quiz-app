import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ExamType, QuizMode, Subject, Chapter, Topic, Difficulty } from '@/types/quiz';
import { QuizCard } from './QuizCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Brain, GraduationCap, BookOpen } from 'lucide-react';
import { ProgressIndicator } from './ProgressIndicator';
import { DifficultySelector } from './DifficultySelector';
import { QuizPreview } from './QuizPreview';
import { sounds } from '@/lib/sounds';

type QuizStepperProps = {
  exams: ExamType[];
  onStart: (params: {
    examId: string;
    mode: QuizMode;
    subjectId?: string;
    chapterId?: string;
    topicId?: string;
    difficulty: Difficulty;
  }) => void;
};

export function QuizStepper({ exams, onStart }: QuizStepperProps) {
  const [step, setStep] = useState(1);
  const [selectedExam, setSelectedExam] = useState<ExamType | null>(null);
  const [selectedMode, setSelectedMode] = useState<QuizMode | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('intermediate');
  const [showPreview, setShowPreview] = useState(false);

  const modes = [
    {
      id: 'exam',
      name: 'Full Exam',
      description: 'Take a complete exam simulation',
      icon: GraduationCap,
    },
    {
      id: 'chapter',
      name: 'Chapter-wise',
      description: 'Practice specific chapters',
      icon: BookOpen,
    },
    {
      id: 'topic',
      name: 'Topic-wise',
      description: 'Master individual topics',
      icon: Brain,
    },
  ];

  const steps = ['Exam', 'Mode', 'Subject', 'Chapter', 'Topic', 'Difficulty'];
  const currentStep = showPreview ? steps.length : step;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && step > 1) {
        goBack();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [step]);

  const handleStart = () => {
    if (!selectedExam || !selectedMode) return;

    sounds.complete();
    onStart({
      examId: selectedExam._id,
      mode: selectedMode as QuizMode,
      subjectId: selectedSubject?._id,
      chapterId: selectedChapter?._id,
      topicId: selectedTopic?._id,
      difficulty,
    });
  };

  const goBack = () => {
    sounds.select();
    if (showPreview) {
      setShowPreview(false);
      return;
    }

    if (step === 6) {
      setStep(getLastStep());
    } else if (step === 5) {
      setSelectedTopic(null);
      setStep(4);
    } else if (step === 4) {
      setSelectedChapter(null);
      setStep(3);
    } else if (step === 3) {
      setSelectedSubject(null);
      setStep(2);
    } else if (step === 2) {
      setSelectedMode(null);
      setStep(1);
    }
  };

  const getLastStep = () => {
    if (selectedMode === 'topic') return 5;
    if (selectedMode === 'chapter') return 4;
    return 2;
  };

  const handleNext = () => {
    sounds.select();
    if (step === 6 || (selectedMode === 'exam' && step === 2) || 
        (selectedMode === 'chapter' && step === 4) || 
        (selectedMode === 'topic' && step === 5)) {
      setShowPreview(true);
    } else {
      setStep(step + 1);
    }
  };

  if (showPreview && selectedExam && selectedMode) {
    return (
      <QuizPreview
        exam={selectedExam}
        mode={selectedMode}
        subject={selectedSubject?.name}
        chapter={selectedChapter?.name}
        topic={selectedTopic?.name}
        difficulty={difficulty}
        onStart={handleStart}
        onBack={goBack}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ProgressIndicator
        steps={steps}
        currentStep={currentStep}
        className="mb-12"
      />

      {step > 1 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={goBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              Choose Your Exam
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exams.map((exam) => (
                <QuizCard
                  key={exam._id}
                  title={exam.name}
                  description={exam.description}
                  image={exam.image}
                  selected={selectedExam?._id === exam._id}
                  onClick={() => {
                    sounds.select();
                    setSelectedExam(exam);
                    setStep(2);
                  }}
                  onMouseEnter={() => sounds.hover()}
                />
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && selectedExam && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              Choose Your Practice Mode
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {modes.map(({ id, name, description }) => (
                <QuizCard
                  key={id}
                  title={name}
                  description={description}
                  selected={selectedMode === id}
                  className="text-center"
                  onClick={() => {
                    sounds.select();
                    setSelectedMode(id as QuizMode);
                    if (id === 'exam') {
                      setStep(6);
                    } else {
                      setStep(3);
                    }
                  }}
                  onMouseEnter={() => sounds.hover()}
                />
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && selectedExam && selectedMode && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              Choose Your Subject
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedExam.subjects?.map((subject) => (
                <QuizCard
                  key={subject._id}
                  title={subject.name}
                  description={subject.description}
                  selected={selectedSubject?._id === subject._id}
                  onClick={() => {
                    sounds.select();
                    setSelectedSubject(subject);
                    setStep(4);
                  }}
                  onMouseEnter={() => sounds.hover()}
                />
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && selectedSubject && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              Choose Your Chapter
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedSubject.chapters?.map((chapter) => (
                <QuizCard
                  key={chapter._id}
                  title={chapter.name}
                  description={chapter.description}
                  selected={selectedChapter?._id === chapter._id}
                  onClick={() => {
                    sounds.select();
                    setSelectedChapter(chapter);
                    if (selectedMode === 'chapter') {
                      setStep(6);
                    } else {
                      setStep(5);
                    }
                  }}
                  onMouseEnter={() => sounds.hover()}
                />
              ))}
            </div>
          </motion.div>
        )}

        {step === 5 && selectedChapter && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              Choose Your Topic
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedChapter.topics?.map((topic) => (
                <QuizCard
                  key={topic._id}
                  title={topic.name}
                  description={topic.description}
                  selected={selectedTopic?._id === topic._id}
                  onClick={() => {
                    sounds.select();
                    setSelectedTopic(topic);
                    setStep(6);
                  }}
                  onMouseEnter={() => sounds.hover()}
                />
              ))}
            </div>
          </motion.div>
        )}

        {step === 6 && (
          <motion.div
            key="step6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              Select Difficulty Level
            </h2>
            <DifficultySelector
              value={difficulty}
              onChange={(value) => {
                sounds.select();
                setDifficulty(value);
                handleNext();
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}