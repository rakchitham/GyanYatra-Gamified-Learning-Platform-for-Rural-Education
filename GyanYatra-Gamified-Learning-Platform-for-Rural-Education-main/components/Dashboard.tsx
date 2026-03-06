
import React, { useState } from 'react';
import type { View, Subject, Student } from '../types';
import { SUBJECTS, STUDENTS_DATA, DAILY_UPDATE, ICONS, MOTIVATIONAL_QUOTES, MOTIVATIONAL_VIDEOS } from '../constants';
import { useLocale } from '../contexts/LocaleContext';

interface DashboardProps {
    onNavigate: (view: View, subject?: Subject) => void;
}

const SubjectCard: React.FC<{ subject: Subject; onClick: () => void }> = ({ subject, onClick }) => {
    const colorClasses: { [key: string]: string } = {
        sky: 'from-sky-500 to-cyan-400',
        emerald: 'from-emerald-500 to-green-400',
        rose: 'from-rose-500 to-pink-400',
        amber: 'from-amber-500 to-yellow-400',
        indigo: 'from-indigo-500 to-violet-400'
    };

    return (
        <div 
            className={`bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-violet-500/20 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-slate-700`}
            onClick={onClick}
        >
            <div className={`p-3 rounded-full inline-block bg-gradient-to-br ${colorClasses[subject.color]}`}>
                <div className="text-white">{subject.icon}</div>
            </div>
            <h3 className="mt-4 text-xl font-bold text-white">{subject.name}</h3>
            <p className="mt-1 text-sm text-gray-400">{subject.description}</p>
            <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{subject.progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                    <div className={`bg-gradient-to-r ${colorClasses[subject.color]} h-2.5 rounded-full`} style={{ width: `${subject.progress}%` }}></div>
                </div>
            </div>
        </div>
    );
};

const LeaderboardItem: React.FC<{ student: Student, rank: number }> = ({ student, rank }) => (
    <li className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-700/50">
        <div className="flex items-center">
            <span className="text-lg font-bold text-gray-400 w-8 text-center">{rank}</span>
            <span className="ml-4 font-medium text-white">{student.name}</span>
        </div>
        <div className="flex items-center font-semibold text-amber-400">
            {student.points} pts {ICONS.STAR}
        </div>
    </li>
);


const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
    const { t } = useLocale();
    const student = STUDENTS_DATA[0];
    const sortedStudents = [...STUDENTS_DATA].sort((a, b) => b.points - a.points);
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [videoModal, setVideoModal] = useState<{isOpen: boolean; videoId: string | null}>({ isOpen: false, videoId: null });

    const handleNewQuote = () => {
        setQuoteIndex(prev => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    };

    const currentQuote = MOTIVATIONAL_QUOTES[quoteIndex];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">{t('dashboard.welcome', { name: student.name })}</h1>
                <p className="text-gray-400 mt-1">{t('dashboard.tagline')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SUBJECTS.map(subject => (
                    <SubjectCard key={subject.id} subject={subject} onClick={() => onNavigate('module', subject)} />
                ))}
            </div>

            <div 
                className="bg-gradient-to-r from-violet-600 to-indigo-600 p-8 rounded-xl shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-violet-500 flex flex-col md:flex-row items-center justify-between text-center md:text-left"
                onClick={() => onNavigate('jeeNeet')}
            >
                <div>
                    <h2 className="text-3xl font-bold text-white">NEET/JEE Prep Hub</h2>
                    <p className="text-violet-200 mt-2">Access exclusive mock tests, performance analytics, and revision notes.</p>
                </div>
                <div className="text-white opacity-80 mt-4 md:mt-0">
                    {ICONS.JEENEET}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-4">{t('dashboard.quoteTitle')}</h3>
                    <blockquote className="flex-grow">
                        <p className="text-lg text-gray-300 italic">"{currentQuote.quote}"</p>
                        <cite className="block text-right text-violet-400 mt-2 not-italic font-semibold">- {currentQuote.author}</cite>
                    </blockquote>
                    <button onClick={handleNewQuote} className="mt-4 self-end bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                        {t('dashboard.newQuote')}
                    </button>
                </div>
                <div className="bg-gradient-to-br from-violet-800 to-indigo-800 p-6 rounded-xl text-white flex flex-col justify-center items-center text-center border border-violet-600">
                     <h3 className="text-xl font-bold">{t('dashboard.dailyUpdateTitle')}</h3>
                     <p className="mt-3 text-violet-200">{DAILY_UPDATE.fact}</p>
                </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">{t('dashboard.inspirationTitle')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {MOTIVATIONAL_VIDEOS.map(video => (
                        <div key={video.id} className="cursor-pointer group relative" onClick={() => setVideoModal({isOpen: true, videoId: video.videoId})}>
                            <img src={video.thumbnail} alt={video.title} className="rounded-lg w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                                <svg className="w-12 h-12 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                            </div>
                            <p className="text-sm font-semibold text-white mt-2 truncate">{video.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">{t('dashboard.leaderboard')}</h3>
                <ul className="space-y-2">
                    {sortedStudents.map((student, index) => (
                        <LeaderboardItem key={student.id} student={student} rank={index + 1} />
                    ))}
                </ul>
            </div>
            
             {videoModal.isOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setVideoModal({isOpen: false, videoId: null})}>
                    <div className="bg-slate-900 rounded-lg shadow-2xl w-full max-w-3xl aspect-video relative" onClick={e => e.stopPropagation()}>
                        <iframe
                            className="w-full h-full rounded-lg"
                            src={`https://www.youtube.com/embed/${videoModal.videoId}?autoplay=1&rel=0`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <button onClick={() => setVideoModal({isOpen: false, videoId: null})} className="absolute -top-3 -right-3 bg-white text-slate-900 rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg">&times;</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;