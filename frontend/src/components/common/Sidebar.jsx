import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  Users, 
  Moon, 
  Settings, 
  Heart,
  Brain,
  MessageSquare,
  Bot 
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const regularItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/analytics', label: 'Analytics', icon: Activity },
    { path: '/professionals', label: 'Professionals', icon: Users },
    { path: '/meditation', label: 'Meditation', icon: Moon },
    { path: '/community', label: 'Community', icon: MessageSquare },
    { path: '/wellness', label: 'Wellness', icon: Heart },
    { path: '/ai-assessment', label: 'AI Assessment', icon: Brain },
    { path: '/settings', label: 'Settings' }
  ];

  const chatItem = {
    path: '/mental-health-chat',
    label: 'Mental Health Chat',
    icon: Bot,
    isSpecial: true
  };

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <nav className="p-4 space-y-2">
        {/* Regular Items */}
        {regularItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg transition-all
              ${location.pathname === item.path 
                ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' 
                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            `}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}

        {/* Divider */}
        <div className="my-4 border-t border-gray-200 dark:border-gray-700" />

        {/* Chat Item */}
        <Link
          to={chatItem.path}
          className={`
            flex items-center gap-3 px-4 py-4 rounded-lg transition-all
            ${location.pathname === chatItem.path
              ? 'bg-indigo-500 text-white'
              : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
            }
            hover:bg-indigo-600 hover:text-white
            transform hover:scale-[1.02] hover:shadow-lg group
          `}
        >
          <Bot className="w-6 h-6 flex-shrink-0 transition-transform group-hover:scale-110" />
          <span className="font-medium">{chatItem.label}</span>
          <span className="ml-auto px-2 py-1 text-xs bg-white/20 rounded-full">
            Live
          </span>
        </Link>
      </nav>
    </aside>
  );
}