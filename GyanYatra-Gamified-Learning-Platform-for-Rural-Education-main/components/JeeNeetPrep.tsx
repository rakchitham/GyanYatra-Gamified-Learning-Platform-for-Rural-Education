
import React, { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { EXAM_PREP_DATA } from '../constants';

interface JeeNeetPrepProps {
    onBack: () => void;
}

const JeeNeetPrep: React.FC<JeeNeetPrepProps> = ({ onBack }) => {
    const [exam, setExam] = useState<'jee' | 'neet'>('jee');
    const data = EXAM_PREP_DATA[exam];

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <button onClick={onBack} className="text-violet-400 hover:text-violet-300 font-semibold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Back to Dashboard
            </button>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
                <h1 className="text-3xl font-bold text-white">NEET/JEE Prep Hub</h1>
                <p className="text-gray-400 mt-2">Your dedicated space for competitive exam preparation.</p>
                
                <div className="mt-6 inline-flex bg-slate-700 rounded-lg p-1 space-x-1">
                    <button onClick={() => setExam('jee')} className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${exam === 'jee' ? 'bg-violet-600 text-white shadow' : 'text-gray-300 hover:bg-slate-600'}`}>JEE Prep</button>
                    <button onClick={() => setExam('neet')} className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${exam === 'neet' ? 'bg-violet-600 text-white shadow' : 'text-gray-300 hover:bg-slate-600'}`}>NEET Prep</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h2 className="text-2xl font-bold text-white mb-4">Mock Tests</h2>
                    <div className="space-y-4">
                        {data.mockTests.map(test => (
                             <div key={test.id} className="bg-slate-700/50 p-4 rounded-lg flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-white">{test.name}</h3>
                                    <p className="text-xs text-gray-400">{test.questions} Questions | {test.duration} mins</p>
                                </div>
                                <button onClick={() => alert(`Starting test: ${test.name}`)} className="bg-violet-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-violet-700 text-sm">
                                    Start Test
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                 <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                     <h2 className="text-2xl font-bold text-white mb-4">Performance Analytics</h2>
                     <ResponsiveContainer width="100%" height={250}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.performance}>
                            <PolarGrid stroke="#475569" />
                            <PolarAngleAxis dataKey="subject" stroke="#94a3b8" />
                            <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                            <Tooltip contentStyle={{ backgroundColor: '#334155', border: '1px solid #475569' }}/>
                        </RadarChart>
                    </ResponsiveContainer>
                 </div>
            </div>

             <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-4">Quick Revision Notes</h2>
                <div className="space-y-3">
                    {data.revisionNotes.map(note => (
                        <details key={note.title} className="bg-slate-700/50 p-3 rounded-lg cursor-pointer">
                            <summary className="font-semibold text-white list-none flex justify-between items-center">
                                {note.title}
                                <svg className="w-5 h-5 text-gray-400 transform transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <p className="text-gray-300 mt-2 text-sm">{note.content}</p>
                        </details>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default JeeNeetPrep;
