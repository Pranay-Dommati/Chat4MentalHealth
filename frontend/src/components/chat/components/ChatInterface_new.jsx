import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, Heart, AlertCircle, Activity } from 'lucide-react';
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

  const LoadingIndicator = () => (
    <div className="flex items-center space-x-2 p-4 bg-white dark:bg-gray-800 rounded-lg max-w-xs shadow-sm">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">AI is thinking...</span>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Connection Status Bar */}
      <div className="flex-shrink-0 px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Assistant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isBackendConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {isBackendConnected ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4 max-w-md">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Welcome to AI Mental Health Support
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                I'm here to provide personalized support using evidence-based responses. 
                Share how you're feeling, and I'll help guide you through your emotions.
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
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                message.type === 'user' 
                  ? 'bg-indigo-600 text-white' 
                  : message.isError
                  ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
              }`}>
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    {message.timestamp && (
                      <p className="text-xs opacity-70 mt-2">
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
                {message.confidence > 0.3 && message.type === 'user' && (
                  <div className="mt-2 text-xs opacity-70">
                    Mood: {message.sentiment}
                  </div>
                )}
              </div>
            </div>
          )
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Messages - Only show when conversation is new */}
      {messages.length === 1 && (
        <div className="flex-shrink-0 px-4 pb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Suggested topics:</p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {suggestedMessages.map((msg, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedMessage(msg)}
                className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 
                  border border-gray-200 dark:border-gray-600 rounded-full text-sm 
                  text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 
                  hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors 
                  whitespace-nowrap flex-shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
                {msg}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Box - Fixed at bottom */}
      <div className="flex-shrink-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 rounded-xl p-3 shadow-sm">
          <input
            type="text"
            className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none text-sm resize-none"
            placeholder={isBackendConnected ? "Type your message..." : "Reconnecting to AI assistant..."}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSendMessage()}
            disabled={!isBackendConnected || isTyping}
          />
          <button
            className={`p-2 rounded-lg transition-all duration-200 ${
              userInput.trim() && isBackendConnected && !isTyping
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
            onClick={handleSendMessage}
            disabled={!userInput.trim() || !isBackendConnected || isTyping}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        {!isBackendConnected && (
          <p className="text-xs text-red-500 dark:text-red-400 mt-2 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Unable to connect to AI backend. Please check your connection.
          </p>
        )}
      </div>
    </div>
  );
}
