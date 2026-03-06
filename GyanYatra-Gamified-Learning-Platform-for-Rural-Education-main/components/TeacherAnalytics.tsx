
import React, { useState, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { STUDENTS_DATA, SUBJECTS, ICONS } from '../constants';
import { useLocale } from '../contexts/LocaleContext';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-700 p-2 border border-slate-600 rounded">
        <p className="label text-white">{`${label} : ${payload[0].value} mins/week`}</p>
      </div>
    );
  }
  return null;
};


const TeacherAnalytics: React.FC = () => {
    const { t } = useLocale();
    const [files, setFiles] = useState<File[]>([]);
    
    const engagementData = STUDENTS_DATA.map(student => ({
        name: student.name,
        engagement: student.engagement,
    }));

    const masteryData = SUBJECTS.map(subject => {
        const subjectScores = STUDENTS_DATA.map(student => student.mastery[subject.id] || 0);
        const average = subjectScores.reduce((a, b) => a + b, 0) / subjectScores.length;
        return {
            subject: subject.name,
            'Class Average': parseFloat(average.toFixed(1)),
            fullMark: 100,
        };
    });

    const handleFileDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const droppedFiles = Array.from(event.dataTransfer.files);
        if (droppedFiles.length > 0) {
            setFiles(prev => [...prev, ...droppedFiles]);
        }
    }, []);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || []);
        if (selectedFiles.length > 0) {
            setFiles(prev => [...prev, ...selectedFiles]);
        }
    };
    
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const removeFile = (fileName: string) => {
        setFiles(prev => prev.filter(f => f.name !== fileName));
    };

    const handleUpload = () => {
        if (files.length === 0) {
            alert("Please select files to upload.");
            return;
        }
        // Simulate upload
        alert(`Uploading ${files.length} file(s)... (Simulation)`);
        setFiles([]); // Clear files after "upload"
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">{t('analytics.title')}</h1>
                <p className="text-gray-400 mt-1">{t('analytics.tagline')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-4">{t('analytics.engagement')}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={engagementData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(71, 85, 105, 0.5)'}}/>
                            <Legend />
                            <Bar dataKey="engagement" name="Engagement (minutes)" fill="#8b5cf6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-4">{t('analytics.mastery')}</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={masteryData}>
                            <PolarGrid stroke="#475569" />
                            <PolarAngleAxis dataKey="subject" stroke="#94a3b8" />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8"/>
                            <Radar name="Class Average" dataKey="Class Average" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                            <Tooltip contentStyle={{ backgroundColor: '#334155', border: '1px solid #475569' }}/>
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">{t('analytics.performance')}</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-300">
                        <thead className="bg-slate-700/50 text-xs uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-3">{t('analytics.student')}</th>
                                {SUBJECTS.map(s => <th key={s.id} scope="col" className="px-6 py-3 text-center">{s.name}</th>)}
                                <th scope="col" className="px-6 py-3 text-center">{t('analytics.totalPoints')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {STUDENTS_DATA.map(student => (
                                <tr key={student.id} className="border-b border-slate-700 hover:bg-slate-700/30">
                                    <td className="px-6 py-4 font-medium text-white">
                                        {student.name}
                                    </td>
                                    {SUBJECTS.map(s => (
                                        <td key={s.id} className="px-6 py-4 text-center">{student.mastery[s.id] || 'N/A'}%</td>
                                    ))}
                                    <td className="px-6 py-4 text-center font-bold text-amber-400">{student.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

             <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">{t('analytics.uploadTitle')}</h3>
                <div 
                    onDrop={handleFileDrop} 
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-violet-500 hover:bg-slate-700/50 transition-colors"
                    onClick={() => document.getElementById('file-input')?.click()}
                >
                    {ICONS.UPLOAD}
                    <p className="mt-2 text-gray-400">{t('analytics.uploadPrompt')}</p>
                    <input type="file" id="file-input" multiple className="hidden" onChange={handleFileSelect} />
                </div>

                {files.length > 0 && (
                    <div className="mt-6">
                        <h4 className="font-semibold text-white mb-2">Selected Files:</h4>
                        <ul className="space-y-2">
                            {files.map((file, index) => (
                                <li key={index} className="flex justify-between items-center bg-slate-700 p-3 rounded-lg text-sm">
                                    <span className="text-gray-300 truncate">{file.name}</span>
                                    <div className="flex items-center">
                                      <span className="text-gray-400 mr-4 text-xs">{(file.size / 1024).toFixed(1)} KB</span>
                                      <button onClick={() => removeFile(file.name)} className="text-red-400 hover:text-red-300 font-bold">&times;</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button onClick={handleUpload} className="mt-6 w-full bg-violet-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-violet-700 transition-all">
                            {t('analytics.uploadButton')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherAnalytics;