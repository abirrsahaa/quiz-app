import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Difficulty } from '@/types/quiz';
import { Sparkles, Zap, Target } from 'lucide-react';

type DifficultySelectorProps = {
  value: Difficulty;
  onChange: (difficulty: Difficulty) => void;
};

const difficulties: Array<{
  value: Difficulty;
  label: string;
  icon: typeof Sparkles;
  description: string;
}> = [
  {
    value: 'beginner',
    label: 'Beginner',
    icon: Sparkles,
    description: 'Perfect for starting your journey',
  },
  {
    value: 'intermediate',
    label: 'Intermediate',
    icon: Zap,
    description: 'For those with some experience',
  },
  {
    value: 'advanced',
    label: 'Advanced',
    icon: Target,
    description: 'Challenge yourself with complex questions',
  },
];

export function DifficultySelector({ value, onChange }: DifficultySelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {difficulties.map((difficulty) => {
        const Icon = difficulty.icon;
        const isSelected = value === difficulty.value;

        return (
          <motion.div
            key={difficulty.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={cn(
                'cursor-pointer transition-all duration-300',
                isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'
              )}
              onClick={() => onChange(difficulty.value)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center mb-3',
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-medium mb-1">{difficulty.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {difficulty.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}