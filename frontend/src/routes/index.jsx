import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Dashboard from '../components/dashboard/DashboardPage';
import Analytics from '../components/analytics/AnalyticsPage';
import Professionals from '../components/professionals/ProfessionalsPage';
import Meditation from '../components/meditation/MeditationPage';
import Community from '../components/community/CommunityPage';
import Settings from '../components/settings/SettingsPage';
import Wellness from '../components/wellness/WellnessPage';
import AIAssessment from '../components/ai-assessment/AIAssessmentPage';
import ChatPage from '../components/chat/ChatPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/analytics', element: <Analytics /> },
      { path: '/professionals', element: <Professionals /> },
      { path: '/meditation', element: <Meditation /> },
      { path: '/community', element: <Community /> },
      { path: '/settings', element: <Settings /> },
      { path: '/wellness', element: <Wellness /> },
      { path: '/ai-assessment', element: <AIAssessment /> },
      { path: '/mental-health-chat', element: <ChatPage /> }
    ]
  }
]);