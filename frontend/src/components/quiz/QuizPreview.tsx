import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle,  CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Brain, Target, Trophy } from 'lucide-react';
import type { ExamType, QuizMode, Difficulty } from '@/types/quiz';

type QuizPreviewProps = {
  exam: ExamType;
  mode: QuizMode;
  subject?: string;
  topic?: string;
  difficulty: Difficulty;
  onStart: () => void;
  onBack: () => void;
};

export function QuizPreview({
  exam,
  mode,
  subject,
  topic,
  difficulty,
  onStart,
  onBack,
}: QuizPreviewProps) {
  const details = [
    {
      icon: Clock,
      label: "Duration",
      value: `${exam.duration || 60} minutes`,
    },
    {
      icon: Brain,
      label: "Questions",
      value: exam.questionCount || 30,
    },
    {
      icon: Target,
      label: "Difficulty",
      value: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
    },
    {
      icon: Trophy,
      label: "Mode",
      value: mode.charAt(0).toUpperCase() + mode.slice(1),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <Card>
        <CardHeader>
          <CardTitle>Quiz Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Selected Options:</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Exam: {exam.name}</li>
              {subject && <li>• Subject: {subject}</li>}
              {topic && <li>• Topic: {topic}</li>}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onStart} className="flex-1">
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}