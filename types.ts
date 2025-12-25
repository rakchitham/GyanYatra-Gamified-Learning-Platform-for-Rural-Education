
import type React from 'react';

export type View = 'dashboard' | 'module' | 'tutor' | 'analytics' | 'profile' | 'jeeNeet';
export type UserRole = 'student' | 'teacher' | 'admin';

export interface Subject {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    progress: number;
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
}

export interface Student {
    id: number;
    name: string;
    points: number;
    engagement: number; // minutes per week
    mastery: {
        [subjectId: string]: number; // score from 0 to 100
    };
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}