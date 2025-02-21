import { BarChart, Calendar, TrendingUp, Activity, Clock } from "lucide-react";
import { useState } from "react";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('week');

  const wellnessData = {
    mood: [65, 70, 75, 68, 72, 80, 78],
    sleep: [7.2, 6.8, 7.5, 7.0, 7.8, 7.2, 7.5],
    meditation: [15, 20, 15, 25, 20, 30, 25],
    activities: [3, 4, 3, 5, 4, 4, 5]
  };

  const insights = [
    {
      title: "Improved Sleep Pattern",
      description: "Your average sleep duration has increased by 30 minutes",
      trend: "up",
      value: "+12%"
    },
    {
      title: "Meditation Consistency",
      description: "You've maintained daily meditation practice for 2 weeks",
      trend: "up",
      value: "14 days"
    },
    {
      title: "Stress Levels",
      description: "Your stress levels have decreased this week",
      trend: "down",
      value: "-18%"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Time Range Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Wellness Analytics
          </h3>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="year">Last Year</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">Average Mood</span>
              <Activity className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">72%</div>
            <div className="text-sm text-green-500">↑ 5% from last week</div>
          </div>
          {/* Add more stat boxes here */}
        </div>
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-800 dark:text-white">
                {insight.title}
              </h4>
              <span className={`text-sm font-medium ${
                insight.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {insight.value}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {insight.description}
            </p>
          </div>
        ))}
      </div>

      {/* Activity Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
          Recent Activities
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <Clock className="w-5 h-5 text-blue-500" />
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">
                  Completed Meditation Session
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  15 minutes • 2 hours ago
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}