import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface QuizCardProps {
    title?: string;
    description?: string;
    image?: string;
    selected?: boolean;
    onClick?: () => void;
    onMouseEnter?: () => void; // Add this line
    className?:string;
  }

export function QuizCard({
  title,
  description,
  image,
  selected,
  onClick,
  className,
}: QuizCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          'relative overflow-hidden cursor-pointer transition-all duration-300',
          selected ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-lg',
          className
        )}
        onClick={onClick}
      >
        {image && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10" />
        )}
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
          />
        )}
        <CardContent className={cn('p-6', image && 'absolute bottom-0 left-0 right-0 z-20 text-white')}>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          {description && (
            <p className="text-sm opacity-90">{description}</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}