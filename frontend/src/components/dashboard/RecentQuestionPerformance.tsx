import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';

const questions = [
  { id: 'Q-28f5', attempts: 4, correct: 4, difficulty: 0.166, mastery: '83.3%', lastAttempt: '2 hours ago' },
  { id: 'Q-28f2', attempts: 4, correct: 4, difficulty: 0.166, mastery: '83.3%', lastAttempt: '3 hours ago' },
];

export default function RecentQuestionPerformance() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Recent Question Performance</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full">Correct</button>
          <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded-full">Incorrect</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="pb-3">Question ID</th>
              <th className="pb-3">Total Attempts</th>
              <th className="pb-3">Correct</th>
              <th className="pb-3">Difficulty</th>
              <th className="pb-3">Mastery</th>
              <th className="pb-3">Last Attempt</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question.id} className="text-sm border-t">
                <td className="py-3 text-blue-600">{question.id}</td>
                <td className="py-3">{question.attempts}</td>
                <td className="py-3 text-green-600">{question.correct}</td>
                <td className="py-3">{question.difficulty}</td>
                <td className="py-3">{question.mastery}</td>
                <td className="py-3 text-gray-500">{question.lastAttempt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}