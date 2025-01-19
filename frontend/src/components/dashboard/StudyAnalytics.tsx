import { Clock, Sun, Moon, Sunset } from 'lucide-react';

const timeBlocks = [
  { label: 'Morning (6 AM - 12 PM)', rate: '85%', icon: Sun, color: 'bg-yellow-500' },
  { label: 'Afternoon (12 PM - 6 PM)', rate: '65%', icon: Sunset, color: 'bg-orange-500' },
  { label: 'Evening (6 PM - 12 AM)', rate: '75%', icon: Moon, color: 'bg-blue-500' },
];

export default function StudyAnalytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Clock className="h-6 w-6 mr-2" />
          Study Time Distribution
        </h2>
        <div className="flex items-end space-x-4 h-48">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={day} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t"
                style={{ height: `${[70, 45, 90, 60, 75, 50, 40][i]}%` }}
              />
              <span className="mt-2 text-sm">{day}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Study Time Blocks</h2>
        <div className="space-y-4">
          {timeBlocks.map((block) => (
            <div key={block.label} className="flex items-center space-x-4">
              <block.icon className={`h-6 w-6 ${block.color}`} />
              <div className="flex-1">
                <p className="text-sm font-medium">{block.label}</p>
                <p className="text-xs text-gray-500">{block.rate} completion rate</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}