
import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import LearningModule from './components/LearningModule';
import AiTutor from './components/AiTutor';
import TeacherAnalytics from './components/TeacherAnalytics';
import Profile from './components/Profile';
import Auth from './components/Auth';
import JeeNeetPrep from './components/JeeNeetPrep';
import type { View, UserRole, Subject } from './types';
import { LocaleProvider } from './contexts/LocaleContext';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [view, setView] = useState<View>('dashboard');
    const [userRole, setUserRole] = useState<UserRole>('student');
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

    const handleLogin = useCallback((role: UserRole) => {
        setUserRole(role);
        // Set the default view based on the role
        if (role === 'teacher' || role === 'admin') {
            setView('analytics');
        } else {
            setView('dashboard');
        }
        setIsAuthenticated(true);
    }, []);

    const handleLogout = useCallback(() => {
        setIsAuthenticated(false);
        // Reset state for a clean login next time
        setView('dashboard');
        setUserRole('student');
        setSelectedSubject(null);
    }, []);

    const handleNavigate = useCallback((newView: View, subject?: Subject) => {
        setView(newView);
        if (subject) {
            setSelectedSubject(subject);
        } else {
            setSelectedSubject(null);
        }
    }, []);
    
    const renderContent = () => {
        if (userRole === 'teacher' || userRole === 'admin') {
             // In this version, teacher/admin view defaults to analytics
            return <TeacherAnalytics />;
        }

        // Student views
        switch (view) {
            case 'dashboard':
                return <Dashboard onNavigate={handleNavigate} />;
            case 'module':
                return selectedSubject ? (
                    <LearningModule subject={selectedSubject} onBack={() => handleNavigate('dashboard')} />
                ) : (
                    <Dashboard onNavigate={handleNavigate} /> // Fallback to dashboard
                );
            case 'tutor':
                return <AiTutor />;
            case 'profile':
                return <Profile />;
            case 'jeeNeet':
                return <JeeNeetPrep onBack={() => handleNavigate('dashboard')} />;
            default:
                return <Dashboard onNavigate={handleNavigate} />;
        }
    };

    return (
        <LocaleProvider>
            {!isAuthenticated ? (
                <Auth onLogin={handleLogin} />
            ) : (
                <div className="flex h-screen bg-slate-900 text-gray-200">
                    <Sidebar currentView={view} userRole={userRole} onNavigate={handleNavigate} />
                    <main className="flex-1 flex flex-col overflow-hidden">
                        <Header userRole={userRole} onLogout={handleLogout} />
                        <div className="flex-1 overflow-y-auto p-8">
                            {renderContent()}
                        </div>
                    </main>
                </div>
            )}
        </LocaleProvider>
    );
};

export default App;