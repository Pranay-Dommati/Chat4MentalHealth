import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, PlusCircle, AlertCircle, MessageSquare, Heart, Activity } from 'lucide-react';
import { sendMessage, analyzeSentiment, checkBackendHealth } from '../../../services/chatServices';

export default function ChatInterface({ onMessageSent }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const suggestedMessages = [
    "I've been feeling anxious lately",
    "I need someone to talk to",
    "I'm having trouble sleeping",
    "I feel overwhelmed",
    "I'm feeling stressed about work",
    "I need help with my emotions"
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
    content: "Hi, I'm your AI mental health companion. I'm here to support you using evidence-based responses. How are you feeling today?",
    sentiment: 'neutral'
  };

  useEffect(() => {
    setMessages([initialMessage]);
    // Check backend connection
    checkBackendHealth().then(setIsBackendConnected);
  }, []);
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessageContent = userInput.trim();
    setUserInput('');
    setIsTyping(true);

    // Analyze sentiment first
    const sentimentResult = await analyzeSentiment(userMessageContent);

    // Add user message with sentiment
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: userMessageContent,
      timestamp: new Date(),
      status: 'sent',
      sentiment: sentimentResult.sentiment,
      confidence: sentimentResult.confidence
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Show typing indicator
      setMessages(prev => [...prev, { 
        id: 'typing', 
        type: 'system', 
        content: '...',
        isTyping: true
      }]);
      
      // Get AI response using vector store
      const aiResponse = await sendMessage(userMessageContent);
      
      // Remove typing indicator and add AI response
      setMessages(prev => prev
        .filter(msg => msg.id !== 'typing')
        .concat({
          id: Date.now() + 1,
          type: 'bot',
          content: aiResponse,
          timestamp: new Date(),
          sentiment: 'supportive'
        })
      );

      // Update sentiment analysis for parent component
      onMessageSent && onMessageSent(userMessageContent, sentimentResult);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => prev
        .filter(msg => msg.id !== 'typing')
        .concat({
          id: Date.now() + 1,
          type: 'system',
          content: !isBackendConnected 
            ? "I'm currently having trouble connecting to my knowledge base. Please try again later, or consider reaching out to a mental health professional if you need immediate support."
            : "I apologize, but I'm having difficulty processing your message right now. Your feelings are important - please try again or reach out for professional support if needed.",
          timestamp: new Date(),
          isError: true
        })
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestedMessage = (message) => {
    setUserInput(message);
  };
  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return <Heart className="w-3 h-3 text-green-500" />;
      case 'negative': return <AlertCircle className="w-3 h-3 text-red-500" />;
      case 'supportive': return <Heart className="w-3 h-3 text-blue-500" />;
      default: return <Activity className="w-3 h-3 text-gray-500" />;
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'border-l-green-500';
      case 'negative': return 'border-l-red-500';
      case 'supportive': return 'border-l-blue-500';
      default: return 'border-l-gray-500';
    }
  };

  const LoadingIndicator = () => (
    <div className="flex items-center space-x-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg max-w-xs">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">AI is analyzing...</span>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">AI Mental Health Support</h1>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isBackendConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-xs text-gray-400">
              {isBackendConnected ? 'Connected' : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Welcome to AI Mental Health Support
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                Powered by vector-based AI responses. Share how you're feeling, and I'll provide personalized support.
              </p>
            </div>
          </div>
        )}
        {messages.map((message) => (
          message.id === 'typing' ? (
            <LoadingIndicator key="typing" />
          ) : (
            <div key={message.id} 
                 className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl border-l-4 ${
                message.type === 'user' 
                  ? `bg-blue-600 text-white ${getSentimentColor(message.sentiment)}` 
                  : message.isError
                  ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-l-red-500'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-l-blue-500'
              }`}>
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    {message.timestamp && (
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    )}
                  </div>
                  {message.sentiment && (
                    <div className="flex-shrink-0 mt-1">
                      {getSentimentIcon(message.sentiment)}
                    </div>
                  )}
                </div>
                {message.confidence > 0.3 && (
                  <div className="mt-2 text-xs opacity-70">
                    Sentiment: {message.sentiment} ({Math.round(message.confidence * 100)}% confidence)
                  </div>
                )}
              </div>
            </div>
          )
        ))}
        <div ref={messagesEndRef} />
      </div>      {/* Suggested Messages */}
      {messages.length === 1 && (
        <div className="px-4 pb-4">
          <p className="text-sm text-gray-400 mb-3">Try asking about:</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {suggestedMessages.map((msg, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedMessage(msg)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 
                  border border-gray-600 rounded-full text-sm text-gray-300 
                  hover:bg-gray-700 hover:border-gray-500 transition-colors 
                  whitespace-nowrap flex-shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
                {msg}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Box */}
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center gap-3 bg-gray-700 rounded-xl p-3">
          <input
            type="text"
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
            placeholder={isBackendConnected ? "Share how you're feeling..." : "Backend offline - please try again later"}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSendMessage()}
            disabled={!isBackendConnected || isTyping}
          />
          <button
            className={`p-2 rounded-lg transition-colors ${
              userInput.trim() && isBackendConnected && !isTyping
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            onClick={handleSendMessage}
            disabled={!userInput.trim() || !isBackendConnected || isTyping}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        {!isBackendConnected && (
          <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Unable to connect to AI backend. Please check if the server is running.
          </p>
        )}
      </div>
    </div>
  );
}