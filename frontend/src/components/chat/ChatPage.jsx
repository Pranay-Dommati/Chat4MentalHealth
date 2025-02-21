import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import SentimentAnalysis from './components/SentimentAnalysis';
import { MessageCircle } from 'lucide-react';

export default function ChatPage() {
  const [analysis, setAnalysis] = useState({
    anxiety: 45,
    depression: 30,
    stress: 55,
    positivity: 65,
    urgency: 'normal'
  });

  const handleMessageSent = (message) => {
    // Update analysis based on new message
    setAnalysis(prevAnalysis => ({
      ...prevAnalysis,
      // Add sentiment analysis logic here
    }));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 flex flex-col">
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Mental Health Support</h1>
          </div>
        </div>
        <ChatInterface onMessageSent={handleMessageSent} />
      </div>
      <div className="w-96 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <SentimentAnalysis analysis={analysis} />
      </div>
    </div>
  );
}