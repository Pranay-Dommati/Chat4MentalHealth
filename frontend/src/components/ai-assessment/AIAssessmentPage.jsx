import { Brain, MessageSquare, ArrowRight } from "lucide-react";

export default function AIAssessmentPage() {
  const assessmentTypes = [
    {
      title: "Quick Assessment",
      description: "A 5-minute check-in to gauge your current mental state",
      icon: <Brain className="w-6 h-6 text-blue-500" />,
      duration: "5 mins"
    },
    {
      title: "Comprehensive Analysis",
      description: "Detailed assessment of your mental health and well-being",
      icon: <MessageSquare className="w-6 h-6 text-purple-500" />,
      duration: "15 mins"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          AI Mental Health Assessment
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Our AI-powered assessment helps understand your mental well-being through 
          natural conversation. All information shared is private and confidential.
        </p>
      </div>

      {/* Assessment Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assessmentTypes.map((type, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              {type.icon}
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                {type.duration}
              </span>
            </div>
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {type.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {type.description}
            </p>
            <button className="flex items-center text-blue-500 hover:text-blue-600 transition-colors">
              Start Assessment <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}