import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Pages - will be created step by step
import OnboardingPage from './pages/Onboarding/OnboardingPage';
import HomePage from './pages/Home/HomePage';
import PracticePage from './pages/Practice/PracticePage';
import AIInterviewPage from './pages/AIInterview/AIInterviewPage';
import ResumePage from './pages/Resume/ResumePage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import CommunityPage from './pages/Community/CommunityPage';
import SocialPostPage from './pages/SocialPost/SocialPostPage';
import SettingsPage from './pages/Settings/SettingsPage';

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Navigate to="/onboarding" replace />} />
                    <Route path="/onboarding" element={<OnboardingPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/practice" element={<PracticePage />} />
                    <Route path="/ai-interview" element={<AIInterviewPage />} />
                    <Route path="/resume" element={<ResumePage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/social" element={<SocialPostPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
