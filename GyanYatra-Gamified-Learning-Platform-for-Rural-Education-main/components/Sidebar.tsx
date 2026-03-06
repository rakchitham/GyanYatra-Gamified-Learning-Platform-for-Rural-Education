
import React from 'react';
import type { View, UserRole, Subject } from '../types';
import { ICONS } from '../constants';
import { useLocale } from '../contexts/LocaleContext';

interface SidebarProps {
    currentView: View;
    userRole: UserRole;
    onNavigate: (view: View, subject?: Subject) => void;
}

const NavLink: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
            isActive
                ? 'bg-violet-600 text-white'
                : 'text-gray-400 hover:bg-slate-700 hover:text-white'
        }`}
    >
        {icon}
        <span className="ml-4">{label}</span>
    </button>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, userRole, onNavigate }) => {
    const { t } = useLocale();
    return (
        <aside className="w-64 bg-slate-800 border-r border-slate-700 flex-shrink-0 p-4 flex flex-col justify-between">
            <div>
                <div className="flex items-center mb-10 px-2">
                    <span className="text-2xl font-bold text-white tracking-wider">Gyan<span className="text-violet-400">Yatra</span></span>
                </div>
                <nav className="space-y-2">
                    {userRole === 'student' && (
                        <>
                            <NavLink
                                icon={ICONS.DASHBOARD}
                                label={t('sidebar.dashboard')}
                                isActive={currentView === 'dashboard'}
                                onClick={() => onNavigate('dashboard')}
                            />
                            <NavLink
                                icon={ICONS.TUTOR}
                                label={t('sidebar.tutor')}
                                isActive={currentView === 'tutor'}
                                onClick={() => onNavigate('tutor')}
                            />
                            <NavLink
                                icon={ICONS.PROFILE}
                                label={t('sidebar.profile')}
                                isActive={currentView === 'profile'}
                                onClick={() => onNavigate('profile')}
                            />
                        </>
                    )}
                    {(userRole === 'teacher' || userRole === 'admin') && (
                        <NavLink
                            icon={ICONS.ANALYTICS}
                            label={t('sidebar.analytics')}
                            isActive={currentView === 'analytics'}
                            onClick={() => onNavigate('analytics')}
                        />
                    )}
                </nav>
            </div>
            <div className="p-4 bg-slate-700/50 rounded-lg text-center">
                <h4 className="font-semibold text-white">{t('sidebar.helpTitle')}</h4>
                <p className="text-xs text-gray-400 mt-1">
                    {t('sidebar.helpText')}
                </p>
            </div>
        </aside>
    );
};

export default Sidebar;