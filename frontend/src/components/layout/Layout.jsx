import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Home, BarChart, MessageCircle, User, Settings, HeartPulse, Users, Brain } from "lucide-react";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1] || 'dashboard';

  const menuItems = [
    { name: "Dashboard", icon: <Home className="w-5 h-5" />, path: "/" },
    { name: "AI Assessment", icon: <Brain className="w-5 h-5" />, path: "/ai-assessment" },
    { name: "Community", icon: <MessageCircle className="w-5 h-5" />, path: "/community" },
    { name: "Meditation", icon: <User className="w-5 h-5" />, path: "/meditation" },
    { name: "Wellness", icon: <HeartPulse className="w-5 h-5" />, path: "/wellness" },
    { name: "Analytics", icon: <BarChart className="w-5 h-5" />, path: "/analytics" },
    { name: "Professionals", icon: <Users className="w-5 h-5" />, path: "/professionals" },
    { name: "Settings", icon: <Settings className="w-5 h-5" />, path: "/settings" }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <aside className="w-72 bg-white dark:bg-gray-800 shadow-lg flex flex-col p-6 border-r border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">MindWell</h1>
        <nav className="space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                ('/' + currentPath) === item.path
                ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {item.icon}
              <span className="ml-4 font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          {menuItems.find(item => item.path === ('/' + currentPath))?.name || 'Dashboard'}
        </h2>
        <Outlet />
      </main>
    </div>
  );
}