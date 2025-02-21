import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, PlusCircle, AlertCircle } from 'lucide-react';
import MessageBubble from './MessageBubble';

export default function ChatInterface({ onMessageSent }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [analysis, setAnalysis] = useState({
    sentiment: null,
    mood: null,
    urgency: 'normal'
  });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initialMessage = {
    id: 'welcome',
    type: 'system',
    content: "Hi, I'm here to support you. How are you feeling today?",
    options: ["I'm feeling good", "I'm feeling anxious", "I'm feeling down"]
  };

  useEffect(() => {
    setMessages([initialMessage]);
  }, []);

  const handleSendMessage = (content) => {
    const newMessage = {
      id: Date.now(),
      type: 'user',
      content,
      timestamp: new Date(),
      status: 'sent' // Add initial status
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'delivered' }
            : msg
        )
      );
    }, 1000);

    onMessageSent(content);
    setUserInput('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Welcome to Mental Health Support
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                Share how you're feeling, and I'll help guide you through your emotions.
              </p>
            </div>
          </div>
        )}
        {messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={{
              ...message,
              onOptionClick: (option) => handleSendMessage(option)
            }} 
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <PlusCircle className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(userInput)}
            placeholder="Share how you're feeling..."
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:text-white"
          />
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <Smile className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleSendMessage(userInput)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}