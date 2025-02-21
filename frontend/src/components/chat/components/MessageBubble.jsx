import React from 'react';
import { User, Bot, Clock, Check, CheckCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MessageBubble({ message }) {
  const isUser = message.type === 'user';
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const bubbleVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      x: isUser ? 20 : -20 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      x: 0,
      transition: { 
        type: "spring",
        duration: 0.5 
      }
    }
  };

  const statusIndicator = isUser && (
    <span className="ml-2 flex items-center">
      {message.status === 'sent' && <Check className="w-4 h-4 text-gray-400" />}
      {message.status === 'delivered' && <CheckCheck className="w-4 h-4 text-gray-400" />}
      {message.status === 'read' && <CheckCheck className="w-4 h-4 text-blue-500" />}
    </span>
  );

  return (
    <motion.div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial="hidden"
      animate="visible"
      variants={bubbleVariants}
    >
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end gap-2 max-w-[70%]`}>
        <motion.div 
          className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700"
          whileHover={{ scale: 1.1 }}
        >
          {isUser ? (
            <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Bot className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          )}
        </motion.div>

        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <motion.div
            className={`rounded-2xl px-4 py-2 ${
              isUser
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
            {message.options && (
              <motion.div 
                className="mt-2 space-y-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {message.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => message.onOptionClick?.(option)}
                    className={`w-full text-left px-3 py-1.5 rounded text-sm ${
                      isUser
                        ? 'hover:bg-indigo-700 text-white'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                    } transition-colors`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>
          
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3" />
            <span>{formattedTime}</span>
            {statusIndicator}
          </div>
        </div>
      </div>
    </motion.div>
  );
}