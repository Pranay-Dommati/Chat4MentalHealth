import { createBrowserRouter } from 'react-router-dom';
import ChatPage from '../components/chat/ChatPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ChatPage />
  },
  {
    path: '/chat',
    element: <ChatPage />
  }
]);