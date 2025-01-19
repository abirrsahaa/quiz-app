
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtext: string;
  icon: typeof LucideIcon;
  iconColor: string;
  trend?: {
    value: string;
    positive?: boolean;
  };
}

export default function StatCard({ title, value, subtext, icon: Icon, iconColor, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-600 font-medium">{title}</h3>
        <div className={`p-2 rounded-lg ${iconColor}`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
      <div className="space-y-1">
        <h2 className="text-3xl font-bold">{value}</h2>
        <p className="text-gray-500 text-sm">{subtext}</p>
        {trend && (
          <p className={`text-sm ${trend.positive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </p>
        )}
      </div>
    </div>
  );
}