
import React, { useState } from 'react';
import type { UserRole } from '../types';
import { useLocale } from '../contexts/LocaleContext';

interface AuthProps {
    onLogin: (role: UserRole) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
    const { t } = useLocale();
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
    const [selectedRole, setSelectedRole] = useState<UserRole>('student');
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [studentClass, setStudentClass] = useState('6');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd have different logic for login and signup
        // and you'd get the role from the backend on login.
        // For this demo, we'll just "log in" with the currently selected role.
        onLogin(selectedRole);
    };

    const RoleSelector = () => (
        <div className="flex justify-center space-x-2 my-6">
            {(['student', 'teacher', 'admin'] as UserRole[]).map(role => (
                <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`px-4 py-2 text-sm font-semibold rounded-full capitalize transition-all duration-300 transform hover:scale-105 ${
                        selectedRole === role
                            ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/50'
                            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                >
                    {role}
                </button>
            ))}
        </div>
    );

    const commonFormFields = (
        <>
            <div className="relative mb-4">
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                </div>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
            </div>
            <div className="relative mb-6">
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
            </div>
        </>
    );

    const signupForm = (
        <form onSubmit={handleSubmit} className="space-y-4">
            <RoleSelector />
             <div className="relative">
                <label htmlFor="name" className="sr-only">What's your name?</label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                </div>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="What's your name?"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
            </div>
            {commonFormFields}
            {selectedRole === 'student' && (
                <div className="relative">
                    <label htmlFor="class" className="sr-only">Select your class</label>
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                     </div>
                    <select
                        id="class"
                        value={studentClass}
                        onChange={(e) => setStudentClass(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500 appearance-none"
                    >
                        {Array.from({ length: 7 }, (_, i) => i + 6).map(grade => (
                            <option key={grade} value={grade}>Class {grade}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </div>
                </div>
            )}
            <button type="submit" className="w-full bg-violet-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-violet-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-violet-500/50">
                {t('auth.createAccount')}
            </button>
        </form>
    );

    const loginForm = (
         <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-center text-slate-600 font-medium pt-4">{t('auth.loginPrompt')}</h3>
            {commonFormFields}
            <button type="submit" className="w-full bg-violet-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-violet-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-violet-500/50">
                {t('auth.startLearning')}
            </button>
         </form>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-300 via-cyan-400 to-violet-500 flex items-center justify-center p-4 relative overflow-hidden font-sans">
            <div className="absolute top-10 -left-10 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-10 right-0 w-48 h-48 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" style={{animationDelay: '4s'}}></div>
            <div className="absolute top-1/2 -right-10 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" style={{animationDelay: '2s'}}></div>
            
            <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 z-10 text-slate-900">
                <div className="text-center mb-6">
                    <div className="inline-block p-4 bg-violet-100 rounded-full mb-4">
                        <svg className="h-12 w-12 text-violet-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                    </div>
                    <h1 className="text-3xl font-bold">{t('auth.welcome')}</h1>
                    <p className="text-slate-500 mt-2">{t('auth.tagline')}</p>
                </div>

                <div className="flex bg-slate-200 rounded-lg p-1 mb-6">
                    <button onClick={() => setAuthMode('signup')} className={`w-1/2 py-2 rounded-md text-sm font-semibold transition-all ${authMode === 'signup' ? 'bg-white text-violet-600 shadow' : 'text-slate-500'}`}>{t('auth.signup')}</button>
                    <button onClick={() => setAuthMode('login')} className={`w-1/2 py-2 rounded-md text-sm font-semibold transition-all ${authMode === 'login' ? 'bg-white text-violet-600 shadow' : 'text-slate-500'}`}>{t('auth.login')}</button>
                </div>
                
                {authMode === 'signup' ? signupForm : loginForm}
            </div>
        </div>
    );
};

export default Auth;