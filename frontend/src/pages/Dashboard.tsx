
import { Brain, Target, TrendingUp, Zap } from 'lucide-react';

import ProgressOverview from '@/components/dashboard/ProgressOverview';
import StudyAnalytics from '@/components/dashboard/StudyAnalytics';
import RecentQuestionPerformance from '@/components/dashboard/RecentQuestionPerformance';
import AchievementBadges from '@/components/dashboard/Achievement';
import StudyStreak from '@/components/dashboard/StudyStreak';
import UpcomingQuizzes from '@/components/dashboard/UpcomingQuizzes';
import FocusTimer from '@/components/dashboard/FocusTimer';
import TopicMastery from '@/components/dashboard/TopicMastery';
import StatCard from '@/components/dashboard/StatCard';
import MotivationalQuote from '@/components/dashboard/MotivationalQuote';
import Sidebar from '@/components/dashboard/Sidebar';
import { UserProfile } from '@/components/dashboard/UserProfile';


function Dashboard() {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome back, John! 👋</h1>
                <p className="text-gray-600">Ready to continue your learning journey?</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full" title="Target">
                  <Target size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full" title="Brain">
                  <Brain size={20} />
                </button>
              </div>
            </div>
  
            <MotivationalQuote />
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Questions"
                value="145"
                subtext="+12% from last week"
                icon={Brain}
                iconColor="bg-blue-500"
              />
              <StatCard
                title="Mastery Level"
                value="83%"
                subtext="Advanced Level"
                icon={Target}
                iconColor="bg-green-500"
              />
              <StatCard
                title="Success Rate"
                value="91%"
                subtext="+5% improvement"
                icon={TrendingUp}
                iconColor="bg-purple-500"
              />
              <StatCard
                title="Study Streak"
                value="15 days"
                subtext="Keep it up!"
                icon={Zap}
                iconColor="bg-yellow-500"
              />
            </div>
  
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TopicMastery />
              </div>
              <FocusTimer />
            </div>
  
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <UpcomingQuizzes />
              </div>
              <StudyStreak />
            </div>
  
            <AchievementBadges />
  
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentQuestionPerformance />
              <StudyAnalytics />
            </div>
  
            <ProgressOverview />
  
            <UserProfile />
          </div>
        </main>
      </div>
    );
  }
  
  export default Dashboard;