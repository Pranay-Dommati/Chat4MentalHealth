import { ArrowRight, Activity, Brain, Users } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Mental Health Assessment",
      description: "Take our AI-powered assessment to understand your mental well-being",
      gradient: "from-blue-500 to-blue-600",
      icon: <Brain className="w-6 h-6 mb-4" />
    },
    {
      title: "Activity Tracking",
      description: "Monitor your daily activities and mood patterns",
      gradient: "from-purple-500 to-purple-600",
      icon: <Activity className="w-6 h-6 mb-4" />
    },
    {
      title: "Professional Support",
      description: "Connect with licensed mental health professionals",
      gradient: "from-green-500 to-green-600",
      icon: <Users className="w-6 h-6 mb-4" />
    }
  ];

  return (
    <div className="relative min-h-screen p-6">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Welcome to MindWell
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Your journey to better mental health starts here.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 bg-gradient-to-br ${feature.gradient} transform transition-all duration-300 hover:scale-105`}
            >
              {feature.icon}
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/90 mb-4">{feature.description}</p>
              <button className="flex items-center text-white hover:gap-2 transition-all">
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => navigate('/mental-health-chat')}
        className="fixed bottom-10 right-10 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 
          text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 
          transition-all duration-300 group flex items-center justify-center
          border-4 border-white dark:border-gray-800"
        aria-label="Open Mental Health Chat"
      >
        <Brain className="w-8 h-8 group-hover:animate-pulse" />
        
        {/* Tooltip */}
        <span className="absolute -top-12 right-0 bg-gray-900 text-white text-sm
          px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity
          whitespace-nowrap shadow-lg"
        >
          Mental Health Chat
        </span>
      </button>
    </div>
  );
}