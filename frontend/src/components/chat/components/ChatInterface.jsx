import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, PlusCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { sendMessage } from '../../../services/chatServices';

export default function ChatInterface({ onMessageSent }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const suggestedMessages = [
    "I've been feeling anxious lately",
    "I need someone to talk to",
    "I'm having trouble sleeping",
    "I feel overwhelmed"
  ];

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
    content: "Hi, I'm here to support you. How are you feeling today?"
  };

  useEffect(() => {
    setMessages([initialMessage]);
  }, []);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: userInput,
      timestamp: new Date(),
      status: 'sent'
    };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');

    try {
      // Show typing indicator
      setMessages(prev => [...prev, { 
        id: 'typing', 
        type: 'system', 
        content: '...' 
      }]);
      
      // Get AI response
      const aiResponse = await sendMessage(userMessage.content);
      
      // Remove typing indicator and add AI response
      setMessages(prev => prev
        .filter(msg => msg.id !== 'typing')
        .concat({
          id: Date.now() + 1,
          type: 'bot',
          content: aiResponse,
          timestamp: new Date()
        })
      );

      // Update sentiment analysis
      onMessageSent(userMessage.content);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
    }
  };

  const LoadingIndicator = () => (
    <div className="flex items-center space-x-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">AI is typing...</span>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="p-4 text-lg font-semibold bg-gray-800">Mental Health Support</div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-4">
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
          message.id === 'typing' ? (
            <LoadingIndicator key="typing" />
          ) : (
            <div key={message.id} className={`mb-2 p-2 rounded-lg w-fit ${message.type === 'user' ? 'bg-blue-500' : 'bg-gray-700'}`}>
              {message.content}
            </div>
          )
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Messages */}
      {messages.length === 1 && (
        <div className="fixed bottom-20 left-0 right-0 px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 max-w-[calc(100%-2rem)] mx-auto">
            {suggestedMessages.map((msg, index) => (
              <button
                key={index}
                onClick={() => setUserInput(msg)}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 
                  border border-gray-200 dark:border-gray-600 rounded-full 
                  text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 
                  dark:hover:bg-gray-600 transition-colors whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                {msg}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Fixed Input Box */}
      <div className="p-4 bg-gray-800">
        <div className="flex items-center border border-gray-600 rounded-lg p-2">
          <input
            type="text"
            className="flex-1 bg-transparent text-white outline-none p-2"
            placeholder="Share how you're feeling..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            className="ml-2 p-2 bg-blue-500 rounded-lg"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}