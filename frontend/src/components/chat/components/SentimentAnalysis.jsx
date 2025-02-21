import React from 'react';
import { BarChart, Brain, TrendingUp, AlertTriangle } from 'lucide-react';

export default function SentimentAnalysis({ analysis }) {
  const moodIndicators = [
    { label: 'Anxiety', value: analysis?.anxiety || 0 },
    { label: 'Depression', value: analysis?.depression || 0 },
    { label: 'Stress', value: analysis?.stress || 0 },
    { label: 'Positivity', value: analysis?.positivity || 0 }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-indigo-600" />
          Emotional Insights
        </h2>
      </div>

      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Current Mood */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
            Current Mood Analysis
          </h3>
          <div className="space-y-3">
            {moodIndicators.map((indicator) => (
              <div key={indicator.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-300">
                    {indicator.label}
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {indicator.value}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${indicator.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation Trends */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Conversation Patterns
          </h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Based on our conversation, you seem to be experiencing:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
              <li>Moderate anxiety levels</li>
              <li>Improving mood over time</li>
              <li>Positive response to support</li>
            </ul>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
            Suggested Actions
          </h3>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-md transition-colors">
              Schedule meditation session
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-md transition-colors">
              Connect with therapist
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-md transition-colors">
              View wellness exercises
            </button>
          </div>
        </div>

        {/* Emergency Support */}
        {analysis?.urgency === 'high' && (
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-medium">Immediate Support Available</h3>
            </div>
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              Would you like to speak with a crisis counselor?
            </p>
            <button className="mt-3 w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
              Get Emergency Support
            </button>
          </div>
        )}
      </div>
    </div>
  );
}