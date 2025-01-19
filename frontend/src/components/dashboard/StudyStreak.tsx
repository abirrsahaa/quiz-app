import { Flame, Calendar } from 'lucide-react';

export default function StudyStreak() {
  const streakDays = 15;
  const weekData = [
    { day: 'M', completed: true },
    { day: 'T', completed: true },
    { day: 'W', completed: true },
    { day: 'T', completed: true },
    { day: 'F', completed: true },
    { day: 'S', completed: false },
    { day: 'S', completed: false },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Study Streak</h2>
        <div className="flex items-center gap-2 bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
          <Flame className="h-5 w-5" />
          <span>{streakDays} days</span>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <Calendar className="h-5 w-5 text-gray-600" />
        <span className="text-sm text-gray-600">This Week</span>
      </div>
      <div className="flex justify-between">
        {weekData.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className={`text-sm ${day.completed ? 'text-green-500' : 'text-gray-400'}`}>
              {day.day}
            </span>
            <div className={`h-2 w-2 rounded-full ${day.completed ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}