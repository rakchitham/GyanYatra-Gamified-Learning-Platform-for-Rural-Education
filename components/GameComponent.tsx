import React from 'react';
import type { Subject } from '../types';
import MathTreasureHunt from './games/MathTreasureHunt';
import PhysicsRocketSimulator from './games/PhysicsRocketSimulator';
import ChemistryMoleculeBuilder from './games/ChemistryMoleculeBuilder';
import BiologyCellExplorer from './games/BiologyCellExplorer';


interface GameComponentProps {
    subject: Subject;
}

const GameComponent: React.FC<GameComponentProps> = ({ subject }) => {

    switch (subject.id) {
        case 'math':
            return <MathTreasureHunt />;
        case 'physics':
            return <PhysicsRocketSimulator />;
        case 'chemistry':
            return <ChemistryMoleculeBuilder />;
        case 'biology':
            return <BiologyCellExplorer />;
        case 'cs':
            // Fallback for Computer Science, which is not yet implemented
            return (
                <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 flex flex-col items-center text-center">
                    <div className="text-7xl mb-4">🤖</div>
                    <h2 className="text-3xl font-bold text-white">Robot Coding Quest</h2>
                    <p className="text-gray-300 mt-4 max-w-2xl">Code your way to victory! Drag and drop command blocks to guide a robot through a maze. Use loops and if-else logic to solve puzzles, avoid obstacles, and complete your mission.</p>
                    <button
                        onClick={() => alert('This game is coming soon!')}
                        className="mt-8 bg-violet-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-violet-700 transition-all transform hover:scale-105 shadow-lg shadow-violet-500/50"
                    >
                        Play Now!
                    </button>
                </div>
            );
        default:
            return (
                <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 flex flex-col items-center text-center">
                    <div className="text-7xl mb-4">✨</div>
                    <h2 className="text-3xl font-bold text-white">Coming Soon</h2>
                    <p className="text-gray-300 mt-4 max-w-2xl">An exciting new game for this subject is under development. Check back later!</p>
                </div>
            );
    }
};

export default GameComponent;