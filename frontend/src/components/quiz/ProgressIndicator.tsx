import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ProgressIndicatorProps = {
  steps: string[];
  currentStep: number;
  className?: string;
};

export function ProgressIndicator({ steps, currentStep, className }: ProgressIndicatorProps) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto mb-8", className)}>
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep - 1;

          return (
            <div key={step} className="flex flex-col items-center relative z-10">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.2 : 1,
                  backgroundColor: isCompleted || isCurrent ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white mb-2"
              >
                {index + 1}
              </motion.div>
              <span className={cn(
                "text-sm",
                (isCompleted || isCurrent) ? "text-primary font-medium" : "text-muted-foreground"
              )}>
                {step}
              </span>
            </div>
          );
        })}

        {/* Progress line */}
        <div className="absolute top-4 left-0 right-0 h-[2px] bg-muted -translate-y-1/2">
          <motion.div
            className="h-full bg-primary origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: (currentStep - 1) / (steps.length - 1) }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}