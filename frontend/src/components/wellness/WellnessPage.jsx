import { Clipboard, Target, Calendar, ArrowRight, Heart } from "lucide-react";
import { useState } from "react";

export default function WellnessPage() {
  const [selectedPlan, setSelectedPlan] = useState('daily');

  const wellnessPlans = {
    daily: [
      {
        title: "Morning Mindfulness",
        time: "8:00 AM",
        duration: "15 min",
        category: "Meditation",
        completed: true
      },
      {
        title: "Stress Check-in",
        time: "2:00 PM",
        duration: "5 min",
        category: "Assessment",
        completed: false
      },
      {
        title: "Evening Reflection",
        time: "8:00 PM",
        duration: "10 min",
        category: "Journaling",
        completed: false
      }
    ]
  };

  const wellnessStats = [
    {
      label: "Streak",
      value: "7 days",
      icon: <Target className="w-5 h-5 text-green-500" />
    },
    {
      label: "Sessions",
      value: "28",
      icon: <Calendar className="w-5 h-5 text-blue-500" />
    },
    {
      label: "Progress",
      value: "85%",
      icon: <Heart className="w-5 h-5 text-red-500" />
    }
  ];

  return (
    <div className="space-y-8">
      {/* Wellness Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {wellnessStats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Daily Plan */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Today's Plan</h3>
            <button className="text-blue-500 hover:text-blue-600 transition-colors">
              View All Plans
            </button>
          </div>
          <div className="space-y-4">
            {wellnessPlans.daily.map((activity, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <input 
                    type="checkbox" 
                    checked={activity.completed}
                    onChange={() => {}}
                    className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.time} • {activity.duration}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                  {activity.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-colors">
          <div>
            <h3 className="text-xl font-bold mb-2">Start Assessment</h3>
            <p className="opacity-90">Check your current wellness status</p>
          </div>
          <ArrowRight className="w-6 h-6" />
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-colors">
          <div>
            <h3 className="text-xl font-bold mb-2">View Progress</h3>
            <p className="opacity-90">Track your wellness journey</p>
          </div>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}