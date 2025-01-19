

const topics = [
  { name: 'Mathematics', progress: 85, color: 'bg-blue-500' },
  { name: 'Physics', progress: 92, color: 'bg-green-500' },
  { name: 'Chemistry', progress: 78, color: 'bg-orange-500' },
];

export default function TopicMastery() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Topic Mastery</h2>
      <div className="space-y-4">
        {topics.map((topic) => (
          <div key={topic.name}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">{topic.name}</span>
              <span className="text-sm font-medium">{topic.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className={`${topic.color} h-2 rounded-full`}
                style={{ width: `${topic.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}