
import React from 'react';
import { STUDENTS_DATA, BADGES, ICONS } from '../constants';
import type { Badge } from '../types';

const BadgeCard: React.FC<{ badge: Badge }> = ({ badge }) => (
    <div className="bg-slate-700/50 p-4 rounded-lg flex items-center space-x-4 border border-slate-600">
        <div className="text-amber-400 text-3xl">
            {badge.icon}
        </div>
        <div>
            <h4 className="font-bold text-white">{badge.name}</h4>
            <p className="text-xs text-gray-400">{badge.description}</p>
        </div>
    </div>
);

const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const Profile: React.FC = () => {
    const student = STUDENTS_DATA[0];
    const earnedBadges = BADGES.slice(0, 3); // Mock earned badges

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="h-32 w-32 rounded-full ring-4 ring-violet-500 bg-violet-800 flex items-center justify-center">
                    <span className="text-5xl font-bold text-white">{getInitials(student.name)}</span>
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-bold text-white">{student.name}</h1>
                    <p className="text-violet-400 font-semibold mt-1">Star Learner</p>
                    <div className="mt-4 flex items-center justify-center md:justify-start space-x-2 bg-slate-700/50 px-4 py-2 rounded-full">
                        <span className="text-2xl font-bold text-amber-400">{student.points}</span>
                        <span className="text-gray-300">Total Points</span>
                        <span className="text-amber-400">{ICONS.STAR}</span>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6">Achievements & Badges</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {earnedBadges.map(badge => (
                        <BadgeCard key={badge.id} badge={badge} />
                    ))}
                    {/* Placeholder for locked badges */}
                    <div className="bg-slate-700/20 p-4 rounded-lg flex items-center space-x-4 border border-dashed border-slate-600 opacity-60">
                         <div className="text-gray-500 text-3xl">
                            {BADGES[3].icon}
                         </div>
                         <div>
                            <h4 className="font-bold text-gray-400">Locked Badge</h4>
                            <p className="text-xs text-gray-500">Keep learning to unlock more!</p>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;