import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import SentimentAnalysis from './components/SentimentAnalysis';

export default function ChatPage() {
  const [analysis, setAnalysis] = useState({
    anxiety: 45,
    depression: 30,
    stress: 55,
    positivity: 65,
    urgency: 'normal'
  });

  const handleMessageSent = (message, sentimentResult) => {
    // Update analysis based on new message and sentiment
    if (sentimentResult) {
      setAnalysis(prevAnalysis => ({
        ...prevAnalysis,
        // Update based on sentiment analysis
        anxiety: sentimentResult.sentiment === 'negative' ? Math.min(100, prevAnalysis.anxiety + 5) : Math.max(0, prevAnalysis.anxiety - 2),
        depression: sentimentResult.sentiment === 'negative' ? Math.min(100, prevAnalysis.depression + 3) : Math.max(0, prevAnalysis.depression - 1),
        stress: sentimentResult.sentiment === 'negative' ? Math.min(100, prevAnalysis.stress + 4) : Math.max(0, prevAnalysis.stress - 2),
        positivity: sentimentResult.sentiment === 'positive' ? Math.min(100, prevAnalysis.positivity + 5) : Math.max(0, prevAnalysis.positivity - 1),
      }));
    }
  };
  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex-1 flex flex-col h-full">
        <ChatInterface onMessageSent={handleMessageSent} />
      </div>
      <div className="w-96 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
        <SentimentAnalysis analysis={analysis} />
      </div>
    </div>
  );
}