import React, { useState, useEffect, useCallback } from 'react';

const MAZE = [
    ['S', ' ', 'D1', ' '],
    [' ', 'X', ' ', 'X'],
    [' ', ' ', ' ', ' '],
    ['X', 'D2', ' ', 'E'],
];
const QUESTIONS = {
    D1: { question: 'What is 7 * 8?', answer: '56' },
    D2: { question: 'What is the square root of 144?', answer: '12' },
};
const CELL_SIZE = 'clamp(40px, 10vw, 80px)';

const MathTreasureHunt: React.FC = () => {
    const [playerPos, setPlayerPos] = useState({ row: 0, col: 0 });
    const [unlockedDoors, setUnlockedDoors] = useState<string[]>([]);
    const [modal, setModal] = useState<{ isOpen: boolean; doorId: string | null }>({ isOpen: false, doorId: null });
    const [inputValue, setInputValue] = useState('');
    const [feedback, setFeedback] = useState('');
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (modal.isOpen || gameOver) return;

        let { row, col } = playerPos;
        if (e.key === 'ArrowUp') row--;
        else if (e.key === 'ArrowDown') row++;
        else if (e.key === 'ArrowLeft') col--;
        else if (e.key === 'ArrowRight') col++;
        else return;

        if (row >= 0 && row < MAZE.length && col >= 0 && col < MAZE[0].length) {
            const destCell = MAZE[row][col];
            if (destCell === 'X') return; // Wall
            
            if (destCell.startsWith('D') && !unlockedDoors.includes(destCell)) {
                setModal({ isOpen: true, doorId: destCell });
                return;
            }
            if(destCell === 'E') {
                setGameOver(true);
            }
            setPlayerPos({ row, col });
        }
    }, [playerPos, modal.isOpen, unlockedDoors, gameOver]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const handleSubmitAnswer = () => {
        const doorId = modal.doorId;
        if (!doorId) return;

        const question = QUESTIONS[doorId as keyof typeof QUESTIONS];
        if (inputValue.trim() === question.answer) {
            setFeedback('Correct! The door is unlocked.');
            setScore(prev => prev + 100);
            setUnlockedDoors(prev => [...prev, doorId]);
            setTimeout(() => {
                setModal({ isOpen: false, doorId: null });
                setInputValue('');
                setFeedback('');
            }, 1000);
        } else {
            setFeedback('Incorrect. Try again!');
            setScore(prev => prev > 0 ? prev - 10 : 0);
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    const GameInfo = () => (
         <div className="w-full md:w-64 flex-shrink-0 p-4 bg-slate-800 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-violet-400">Math Treasure Hunt</h3>
            <p className="text-sm text-gray-400 mt-2">Use arrow keys to move. Solve math puzzles to unlock doors and find the treasure (E)!</p>
            <div className="mt-4">
                <p className="font-bold text-white text-lg">Score: <span className="text-amber-400">{score}</span></p>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-center">
            <GameInfo />
            <div className="relative bg-slate-700/50 p-4 rounded-lg" style={{ display: 'grid', gridTemplateColumns: `repeat(${MAZE[0].length}, ${CELL_SIZE})`, gap: '4px' }}>
                {MAZE.flat().map((cell, index) => {
                    const row = Math.floor(index / MAZE[0].length);
                    const col = index % MAZE[0].length;
                    let content = ' ';
                    let bgColor = 'bg-slate-600';
                    if (cell === 'X') bgColor = 'bg-slate-800';
                    else if (cell.startsWith('D')) {
                        content = '🚪';
                        bgColor = unlockedDoors.includes(cell) ? 'bg-green-700' : 'bg-amber-700';
                    }
                    else if (cell === 'S') content = '🟢';
                    else if (cell === 'E') content = '💎';

                    return (
                        <div key={index} className={`flex items-center justify-center text-2xl rounded ${bgColor}`} style={{ width: CELL_SIZE, height: CELL_SIZE }}>
                            {playerPos.row === row && playerPos.col === col ? '🧑‍🚀' : content}
                        </div>
                    );
                })}
            </div>
             {modal.isOpen && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="bg-slate-800 p-6 rounded-lg border border-violet-500 shadow-lg w-full max-w-sm text-center">
                        <h3 className="text-lg font-bold text-white">Question</h3>
                        <p className="text-gray-300 my-4">{QUESTIONS[modal.doorId as keyof typeof QUESTIONS].question}</p>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                            className="w-full bg-slate-700 p-2 rounded text-white text-center"
                            autoFocus
                        />
                        <button onClick={handleSubmitAnswer} className="mt-4 bg-violet-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-violet-700">Submit</button>
                        {feedback && <p className={`mt-3 text-sm ${feedback.startsWith('Correct') ? 'text-green-400' : 'text-red-400'}`}>{feedback}</p>}
                    </div>
                </div>
            )}
             {gameOver && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="bg-slate-800 p-8 rounded-lg border border-amber-500 shadow-lg text-center">
                         <h2 className="text-3xl font-bold text-amber-400">Treasure Found!</h2>
                         <p className="text-white mt-2">Final Score: {score}</p>
                         <button onClick={() => {
                             setPlayerPos({row: 0, col: 0});
                             setUnlockedDoors([]);
                             setScore(0);
                             setGameOver(false);
                         }} className="mt-6 bg-violet-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-violet-700">Play Again</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MathTreasureHunt;
