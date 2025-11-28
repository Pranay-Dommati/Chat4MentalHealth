import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, Heart, AlertCircle, Bot } from 'lucide-react';
import { sendMessage, checkBackendHealth } from '../../../services/chatServices';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const suggestedMessages = [
    "I've been feeling anxious lately",
    "I need someone to talk to",
    "I'm having trouble sleeping",
    "I feel overwhelmed",
    "I'm feeling stressed about work"
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
    type: 'bot',
    content: "Hi, I'm your AI mental health companion. I'm here to listen and support you. How are you feeling today?",
  };

  useEffect(() => {
    setMessages([initialMessage]);
    checkBackendHealth().then(setIsBackendConnected);
  }, []);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessageContent = userInput.trim();
    setUserInput('');
    setIsTyping(true);

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: userMessageContent,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Show typing indicator
      setMessages(prev => [...prev, { 
        id: 'typing', 
        type: 'bot', 
        content: '...',
        isTyping: true
      }]);
      
      // Get AI response
      const result = await sendMessage(userMessageContent);
      const aiResponse = result.response;
      
      // Remove typing indicator and add AI response
      setMessages(prev => prev
        .filter(msg => msg.id !== 'typing')
        .concat({
          id: Date.now() + 1,
          type: 'bot',
          content: aiResponse,
          timestamp: new Date(),
        })
      );
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => prev
        .filter(msg => msg.id !== 'typing')
        .concat({
          id: Date.now() + 1,
          type: 'bot',
          content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
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

  const LoadingIndicator = () => (
    <div className="flex items-center space-x-2 p-4 bg-gray-800 rounded-2xl max-w-xs">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="text-sm text-gray-400">Thinking...</span>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Header */}
      <div className="flex-shrink-0 px-8 py-5 bg-gray-800/80 backdrop-blur border-b border-gray-700/50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">MindWell</h2>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isBackendConnected ? 'bg-green-400 animate-pulse' : 'bg-red-500'}`} />
                <span className="text-xs text-gray-400">
                  {isBackendConnected ? 'Ready to help' : 'Connecting...'}
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-sm hidden md:block">Your AI mental health companion</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
        {messages.map((message) => (
          message.isTyping ? (
            <LoadingIndicator key="typing" />
          ) : (
            <div key={message.id} 
                 className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-lg px-5 py-4 rounded-2xl shadow-md ${
                message.type === 'user' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' 
                  : message.isError
                  ? 'bg-red-900/50 text-red-200 border border-red-700'
                  : 'bg-gray-800/80 text-gray-100 border border-gray-700/50'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                {message.timestamp && (
                  <p className="text-xs opacity-50 mt-3">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>
            </div>
          )
        ))}
        <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested Messages */}
      {messages.length <= 2 && (
        <div className="flex-shrink-0 px-4 md:px-8 pb-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-gray-500 mb-3">Quick topics:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedMessages.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedMessage(msg)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-800/60 
                    border border-gray-700/50 rounded-xl text-sm 
                    text-gray-300 hover:bg-gray-700 hover:border-blue-500/50
                    transition-all duration-200 hover:scale-[1.02]"
                >
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  {msg}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Box */}
      <div className="flex-shrink-0 p-4 md:p-6 bg-gray-800/50 backdrop-blur border-t border-gray-700/50">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 bg-gray-800 rounded-2xl p-2 border border-gray-700/50 shadow-lg">
            <input
              type="text"
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm px-4 py-2"
              placeholder={isBackendConnected ? "Share what's on your mind..." : "Connecting..."}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSendMessage()}
              disabled={!isBackendConnected || isTyping}
            />
            <button
              className={`p-3 rounded-xl transition-all duration-200 ${
                userInput.trim() && isBackendConnected && !isTyping
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg hover:shadow-blue-500/25'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
              onClick={handleSendMessage}
              disabled={!userInput.trim() || !isBackendConnected || isTyping}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          {!isBackendConnected && (
            <p className="text-xs text-red-400 mt-3 flex items-center justify-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Connecting to AI backend...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
