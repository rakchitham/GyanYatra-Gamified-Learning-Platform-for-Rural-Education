import React, { useState } from 'react';
import type { Subject, QuizQuestion } from '../types';
import { QUIZ_QUESTIONS } from '../constants';
import Celebration from './Celebration';
import GameComponent from './GameComponent';

interface LearningModuleProps {
    subject: Subject;
    onBack: () => void;
}

const Quiz: React.FC<{ 
    questions: QuizQuestion[]; 
    onQuizComplete: (score: number, total: number) => void;
}> = ({ questions, onQuizComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswer = (answer: string) => {
        if (isAnswered) return;

        setSelectedAnswer(answer);
        setIsAnswered(true);

        let newScore = score;
        if (answer === currentQuestion.correctAnswer) {
            newScore = score + 1;
            setScore(newScore);
        }
        
        // If it's the last question, trigger the completion callback
        if (currentQuestionIndex === questions.length - 1) {
            // Use a timeout to allow the final answer's UI to update before celebration
            setTimeout(() => {
                onQuizComplete(newScore, questions.length);
            }, 500);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            setQuizFinished(true);
        }
    };
    
    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setScore(0);
        setQuizFinished(false);
    }

    if (quizFinished) {
        return (
            <div className="text-center bg-slate-800 p-8 rounded-xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white">Quiz Completed!</h2>
                <p className="text-4xl font-bold mt-4 text-violet-400">
                    Your Score: {score} / {questions.length}
                </p>
                <button
                    onClick={handleRestart}
                    className="mt-8 bg-violet-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-violet-700 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-4">
                <p className="text-lg text-gray-300">Question {currentQuestionIndex + 1} of {questions.length}</p>
                <p className="text-lg font-bold text-violet-400">Score: {score}</p>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-6">{currentQuestion.question}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => {
                    const isCorrect = option === currentQuestion.correctAnswer;
                    const isSelected = option === selectedAnswer;
                    let buttonClass = 'bg-slate-700 hover:bg-slate-600';
                    if (isAnswered) {
                        if (isCorrect) {
                            buttonClass = 'bg-green-500/80';
                        } else if (isSelected && !isCorrect) {
                            buttonClass = 'bg-red-500/80';
                        } else {
                             buttonClass = 'bg-slate-700 opacity-50';
                        }
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => handleAnswer(option)}
                            disabled={isAnswered}
                            className={`p-4 rounded-lg text-left text-white transition-all duration-200 ${buttonClass}`}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
            {isAnswered && (
                <div className="text-right mt-6">
                    <button
                        onClick={handleNext}
                        className="bg-violet-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-violet-700 transition-colors"
                    >
                        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </button>
                </div>
            )}
        </div>
    );
};


const LearningModule: React.FC<LearningModuleProps> = ({ subject, onBack }) => {
    const [mode, setMode] = useState<'selection' | 'quiz' | 'game'>('selection');
    const [showCelebration, setShowCelebration] = useState(false);
    const questions = QUIZ_QUESTIONS[subject.id] || [];

    const handleQuizComplete = (score: number, totalQuestions: number) => {
        if (score === totalQuestions && totalQuestions > 0) {
            setShowCelebration(true);
        }
    };

    const handleNavigateBack = () => {
        if (mode === 'quiz' || mode === 'game') {
            setMode('selection');
        } else {
            onBack();
        }
    };

    const SelectionCard: React.FC<{title: string, description: string, icon: string, onClick: () => void}> = ({ title, description, icon, onClick }) => (
        <div 
            onClick={onClick}
            className="bg-slate-800 p-8 rounded-xl border border-slate-700 text-center hover:border-violet-500 hover:shadow-lg hover:shadow-violet-500/20 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
        >
            <div className="text-5xl mb-4 mx-auto">{icon}</div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="text-gray-400 mt-2">{description}</p>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto">
            {showCelebration && <Celebration onClose={() => setShowCelebration(false)} />}
            <div className="flex justify-between items-center mb-6">
                <button onClick={handleNavigateBack} className="text-violet-400 hover:text-violet-300 font-semibold flex items-center">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                     {mode === 'selection' ? 'Back to Dashboard' : `Back to ${subject.name}`}
                </button>
                <div className="flex items-center text-right">
                    <div className="mr-4">
                        <h1 className="text-2xl font-bold text-white">{subject.name}</h1>
                        <p className="text-sm text-gray-400">Module</p>
                    </div>
                    <div className="text-violet-400">{subject.icon}</div>
                </div>
            </div>

            {mode === 'selection' && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <SelectionCard 
                        title="Take a Quiz"
                        description="Test your knowledge with multiple-choice questions."
                        icon="📝"
                        onClick={() => setMode('quiz')}
                    />
                     <SelectionCard 
                        title="Play a Mini-Game"
                        description="Learn through interactive and fun challenges."
                        icon="🎮"
                        onClick={() => setMode('game')}
                    />
                 </div>
            )}
            
            {mode === 'quiz' && (
                questions.length > 0 ? (
                    <Quiz questions={questions} onQuizComplete={handleQuizComplete} />
                ) : (
                    <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                        <p className="text-gray-400 text-center">No quiz available for this subject yet. Check back soon!</p>
                    </div>
                )
            )}

            {mode === 'game' && (
                <GameComponent subject={subject} />
            )}
        </div>
    );
};

export default LearningModule;