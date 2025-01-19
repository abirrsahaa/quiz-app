
import { CheckCircle, Clock, Book } from 'lucide-react';

const weeklyGoals = [
  { label: 'Questions Attempted', current: 38, total: 50, color: 'bg-green-500', icon: CheckCircle },
  { label: 'Study Hours', current: 12, total: 15, color: 'bg-blue-500', icon: Clock },
  { label: 'Topics Mastered', current: 7, total: 10, color: 'bg-purple-500', icon: Book },
];

export default function ProgressOverview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Overall Progress</h2>
        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-100"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
            />
            <circle
              className="text-green-500"
              strokeWidth="10"
              strokeDasharray="282.743"
              strokeDashoffset="56.5486"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-semibold">75%</span>
          </div>
        </div>
      </div>
      {weeklyGoals.map((goal) => (
        <div key={goal.label} className="bg-white rounded-xl p-6 shadow-sm flex items-center space-x-4">
          <goal.icon className={`h-6 w-6 ${goal.color}`} />
          <div className="flex-1">
            <p className="text-sm font-medium">{goal.label}</p>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${(goal.current / goal.total) * 100}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${goal.color}`}
                ></div>
              </div>
              <p className="text-xs text-gray-500">{goal.current} / {goal.total}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}