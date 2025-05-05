import './App.css';
import {
  BrowserRouter as Router, Routes,
  Route
} from "react-router-dom";

import HomePage from './components/homePage/HomePage'
import SignUpPage from './components/signupPage/SignUp'
import LogInPage from './components/loginPage/LogIn'
import ForgotPage from './components/forgotPage/ForgotPassword'
import DashboardPage from './components/dashboardPage/Dashboard'
import TasksPage from './components/tasksPage/Tasks'
import NotesPage from './components/notesPage/Notes'
import CalendarPage from './components/calendarPage/Calendar'
import ChatPage from './components/chatPage/Chat'
import NotificationsPage from './components/notificationsPage/Notifications'
import SettingsPage from './components/settingsPage/Settings'
import ProfilePage from './components/profilePage/Profile'
import { TaskProvider } from "./contexts/TaskContext";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  
  return (
    <ThemeProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/forgot" element={<ForgotPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Router>
      </TaskProvider>
    </ThemeProvider>
  );
}
export default App;
