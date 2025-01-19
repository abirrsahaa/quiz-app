import React from 'react';
import { Award, Star, Zap, Target, Brain, Trophy } from 'lucide-react';

const badges = [
  {
    icon: Star,
    title: 'Quick Learner',
    description: 'Completed 50 questions in one day',
    color: 'bg-yellow-500',
    earned: true,
  },
  {
    icon: Zap,
    title: 'Focus Master',
    description: '2 hour study session without breaks',
    color: 'bg-purple-500',
    earned: true,
  },
  {
    icon: Target,
    title: 'Perfect Score',
    description: '100% on Advanced Quiz',
    color: 'bg-green-500',
    earned: true,
  },
  {
    icon: Brain,
    title: 'Knowledge Seeker',
    description: 'Studied 3 different subjects',
    color: 'bg-blue-500',
    earned: false,
  },
  {
    icon: Trophy,
    title: 'Champion',
    description: 'Top 5% in your category',
    color: 'bg-orange-500',
    earned: false,
  },
];

export default function AchievementBadges() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Your Achievements</h2>
        <span className="text-sm text-blue-600 hover:underline cursor-pointer">View All</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.title}
            className={`p-4 rounded-lg border-2 ${
              badge.earned ? 'border-gray-200' : 'border-dashed border-gray-300'
            } relative group hover:shadow-md transition-all duration-300`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${badge.color} bg-opacity-10`}>
                <badge.icon
                  size={24}
                  className={`${badge.earned ? badge.color.replace('bg', 'text') : 'text-gray-400'}`}
                />
              </div>
              <div>
                <h3 className={`font-medium ${badge.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                  {badge.title}
                </h3>
                <p className="text-sm text-gray-600">{badge.description}</p>
              </div>
            </div>
            {!badge.earned && (
              <div className="absolute inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <span className="text-sm font-medium text-blue-600">Complete to unlock</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}