
import React from 'react';
import type { UserRole } from '../types';
import { STUDENTS_DATA } from '../constants';
import { useLocale } from '../contexts/LocaleContext';
import { LANGUAGES } from '../i18n/translations';

interface HeaderProps {
    userRole: UserRole;
    onLogout: () => void;
}

const LanguageSelector: React.FC = () => {
    const { locale, setLocale } = useLocale();
    return (
        <select value={locale} onChange={e => setLocale(e.target.value)} className="bg-slate-700 text-white rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
            {LANGUAGES.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
        </select>
    );
};

const Header: React.FC<HeaderProps> = ({ userRole, onLogout }) => {
    const student = STUDENTS_DATA[0];
    const { t } = useLocale();

    const getRoleSpecificDetails = () => {
        switch (userRole) {
            case 'student':
                return { name: student.name, title: 'Star Learner' };
            case 'teacher':
                return { name: 'Priya', title: 'Physics Teacher' };
            case 'admin':
                return { name: 'Mr. Ram', title: 'Administrator' };
            default:
                 return { name: student.name, title: 'Star Learner' };
        }
    };
    
    const { name, title } = getRoleSpecificDetails();
    const dashboardTitle = userRole === 'student' ? t('header.studentDashboard') : userRole === 'teacher' ? t('header.teacherDashboard') : t('header.adminDashboard');
    
    return (
        <header className="bg-slate-800 border-b border-slate-700 p-4 flex justify-between items-center flex-shrink-0">
            <div className="text-lg font-semibold text-white">
                {dashboardTitle}
            </div>
            <div className="flex items-center space-x-4">
                <LanguageSelector />
                <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <div>
                    <div className="font-medium text-white">{name}</div>
                    <div className="text-xs text-gray-400">{title}</div>
                </div>
                <button
                    onClick={onLogout}
                    className="p-2 rounded-full text-gray-400 hover:bg-slate-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-violet-500"
                    aria-label={t('header.logout')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;