

const quizzes = [
  { subject: 'Mathematics', topic: 'Calculus', date: 'Tomorrow', status: 'Ready' },
  { subject: 'Physics', topic: 'Mechanics', date: 'In 2 days', status: 'In Progress' },
];

export default function UpcomingQuizzes() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Upcoming Quizzes</h2>
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500">
            <th className="pb-3">Subject</th>
            <th className="pb-3">Topic</th>
            <th className="pb-3">Date</th>
            <th className="pb-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.topic} className="text-sm">
              <td className="py-2 text-gray-800">{quiz.subject}</td>
              <td className="py-2 text-gray-800">{quiz.topic}</td>
              <td className="py-2 text-gray-800">{quiz.date}</td>
              <td className="py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    quiz.status === 'Ready'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {quiz.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}