
import React from 'react';
import type { Subject, QuizQuestion, Student, Badge } from './types';

// SVG Icons
export const ICONS = {
    DASHBOARD: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
    TUTOR: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    ANALYTICS: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    PROFILE: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    MATH: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3.333A2.333 2.333 0 0012.667 11H11.333A2.333 2.333 0 009 13.333V17m-3-1a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4z" /></svg>,
    PHYSICS: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    CHEMISTRY: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4H7zm0 0a4 4 0 004 4h4a2 2 0 002-2V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4z" /></svg>,
    BIOLOGY: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5V3.935m-14 0A10.003 10.003 0 0112 2a10.003 10.003 0 017.945 1.935M5.055 11a7 7 0 1113.89 0M1.42 9h1.944a2 2 0 011.944 2.158l-1.107 6.42a2 2 0 01-1.944 1.842H2.383a2 2 0 01-1.944-1.842l-1.107-6.42A2 2 0 011.27 9H3.32" /></svg>,
    CS: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    STAR: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>,
    JEENEET: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>,
    UPLOAD: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
};


export const SUBJECTS: Subject[] = [
    { id: 'physics', name: 'Physics', description: 'Explore the laws of motion, energy, and the universe.', icon: ICONS.PHYSICS, color: 'sky', progress: 75 },
    { id: 'chemistry', name: 'Chemistry', description: 'Dive into the world of atoms, molecules, and reactions.', icon: ICONS.CHEMISTRY, color: 'emerald', progress: 40 },
    { id: 'biology', name: 'Biology', description: 'Uncover the secrets of life and living organisms.', icon: ICONS.BIOLOGY, color: 'rose', progress: 60 },
    { id: 'math', name: 'Mathematics', description: 'Master numbers, patterns, and logical thinking.', icon: ICONS.MATH, color: 'amber', progress: 90 },
    { id: 'cs', name: 'Computer Science', description: 'Learn to code and build amazing things.', icon: ICONS.CS, color: 'indigo', progress: 50 },
];

export const QUIZ_QUESTIONS: { [key: string]: QuizQuestion[] } = {
    physics: [
        { question: "What is the unit of force?", options: ["Watt", "Joule", "Newton", "Pascal"], correctAnswer: "Newton" },
        { question: "Which law states that for every action, there is an equal and opposite reaction?", options: ["Ohm's Law", "Newton's First Law", "Newton's Third Law", "Law of Gravitation"], correctAnswer: "Newton's Third Law" },
        { question: "What is the speed of light in a vacuum?", options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"], correctAnswer: "300,000 km/s" },
    ],
    chemistry: [
        { question: "What is the chemical symbol for Gold?", options: ["Ag", "Au", "G", "Go"], correctAnswer: "Au" },
        { question: "What is the most abundant gas in Earth's atmosphere?", options: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"], correctAnswer: "Nitrogen" },
    ],
    biology: [
        { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondrion", "Cell Wall"], correctAnswer: "Mitochondrion" },
        { question: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correctAnswer: "Carbon Dioxide" },
    ],
    math: [
        { question: "What is the value of Pi (to two decimal places)?", options: ["3.14", "3.12", "3.16", "3.18"], correctAnswer: "3.14" },
        { question: "What is 12 multiplied by 12?", options: ["124", "134", "144", "154"], correctAnswer: "144" },
    ],
    cs: [
        { question: "What does 'HTML' stand for?", options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "High-Level Text Language", "Home Tool Markup Language"], correctAnswer: "Hyper Text Markup Language" },
        { question: "Which of the following is a programming language?", options: ["HTTP", "CSS", "Python", "API"], correctAnswer: "Python" },
    ],
};

export const STUDENTS_DATA: Student[] = [
    { id: 1, name: 'Rakchitha', points: 1250, engagement: 240, mastery: { physics: 85, chemistry: 70, biology: 90, math: 95, cs: 80 } },
    { id: 2, name: 'Ruben', points: 1100, engagement: 180, mastery: { physics: 90, chemistry: 65, biology: 75, math: 80, cs: 60 } },
    { id: 3, name: 'Rahul', points: 950, engagement: 300, mastery: { physics: 70, chemistry: 80, biology: 85, math: 75, cs: 70 } },
    { id: 4, name: 'Rethiga', points: 800, engagement: 150, mastery: { physics: 60, chemistry: 50, biology: 65, math: 70, cs: 45 } },
    { id: 5, name: 'Jagan', points: 1300, engagement: 280, mastery: { physics: 95, chemistry: 88, biology: 92, math: 85, cs: 90 } },
    { id: 6, name: 'Jennis', points: 1150, engagement: 220, mastery: { physics: 88, chemistry: 92, biology: 80, math: 91, cs: 75 } },
];

export const BADGES: Badge[] = [
    { id: 'physics-novice', name: 'Physics Novice', description: 'Completed your first Physics quiz!', icon: ICONS.PHYSICS },
    { id: 'math-whiz', name: 'Math Whiz', description: 'Achieved a perfect score in a Math quiz.', icon: ICONS.MATH },
    { id: 'curious-mind', name: 'Curious Mind', description: 'Used the AI Tutor 10 times.', icon: ICONS.TUTOR },
    { id: 'week-champ', name: 'Weekly Champion', description: 'Topped the leaderboard for a week.', icon: ICONS.STAR },
    { id: 'explorer', name: 'Explorer', description: 'Completed a quiz in every subject.', icon: ICONS.DASHBOARD },
];

export const DAILY_UPDATE = {
    title: "Did you know?",
    fact: "A single bolt of lightning contains enough energy to toast 100,000 slices of bread! This is a powerful demonstration of electrical energy in nature.",
};

export const MOTIVATIONAL_QUOTES = [
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { quote: "Strive for progress, not perfection.", author: "Unknown" },
];

export const MOTIVATIONAL_VIDEOS = [
    { id: '1', title: "A.P.J. Abdul Kalam's Inspiring Speech", videoId: "3s_1_HFF_gQ", thumbnail: "https://img.youtube.com/vi/3s_1_HFF_gQ/0.jpg" },
    { id: '2', title: "The Power of Habit", videoId: "OMaKj_H-x0c", thumbnail: "https://img.youtube.com/vi/OMaKj_H-x0c/0.jpg" },
    { id: '3', title: "How to Stay Motivated", videoId: "2vj_2k1oVpI", thumbnail: "https://img.youtube.com/vi/2vj_2k1oVpI/0.jpg" },
];

export const EXAM_PREP_DATA = {
    jee: {
        mockTests: [
            { id: 'jee-p1', name: 'JEE Main Physics Mock 1', duration: 60, questions: 30 },
            { id: 'jee-c1', name: 'JEE Main Chemistry Mock 1', duration: 60, questions: 30 },
            { id: 'jee-m1', name: 'JEE Main Maths Mock 1', duration: 60, questions: 30 },
            { id: 'jee-f1', name: 'JEE Advanced Full Syllabus Test 1', duration: 180, questions: 54 },
        ],
        performance: [
            { subject: 'Physics', score: 75, fullMark: 100 },
            { subject: 'Chemistry', score: 85, fullMark: 100 },
            { subject: 'Maths', score: 70, fullMark: 100 },
        ],
        revisionNotes: [
            { title: 'Kinematics Formulas', content: 'v = u + at, s = ut + 0.5at^2, v^2 = u^2 + 2as' },
            { title: 'Organic Chemistry Reactions', content: 'Key reactions for alkanes, alkenes, alkynes...' },
        ]
    },
    neet: {
        mockTests: [
            { id: 'neet-p1', name: 'NEET Physics Mock 1', duration: 60, questions: 50 },
            { id: 'neet-c1', name: 'NEET Chemistry Mock 1', duration: 60, questions: 50 },
            { id: 'neet-b1', name: 'NEET Biology Mock 1', duration: 60, questions: 100 },
            { id: 'neet-f1', name: 'NEET Full Syllabus Test 1', duration: 200, questions: 200 },
        ],
        performance: [
            { subject: 'Physics', score: 70, fullMark: 100 },
            { subject: 'Chemistry', score: 80, fullMark: 100 },
            { subject: 'Biology', score: 90, fullMark: 100 },
        ],
        revisionNotes: [
            { title: 'Human Physiology Key Points', content: 'Digestive system, Respiratory system...' },
            { title: 'Inorganic Chemistry Trends', content: 'Periodic trends for ionization energy, electron affinity...' },
        ]
    }
};