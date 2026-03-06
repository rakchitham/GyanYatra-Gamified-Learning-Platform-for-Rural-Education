import React from 'react';

interface CelebrationProps {
    onClose: () => void;
}

const ConfettiPiece: React.FC<{ style: React.CSSProperties }> = ({ style }) => {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const combinedStyle = {
        ...style,
        backgroundColor: randomColor,
    };
    return <div className="absolute w-2 h-4" style={combinedStyle}></div>;
};

const Celebration: React.FC<CelebrationProps> = ({ onClose }) => {
    const confetti = Array.from({ length: 100 }).map((_, index) => {
        const style: React.CSSProperties = {
            left: `${Math.random() * 100}vw`,
            animation: `confetti-fall ${3 + Math.random() * 4}s ${Math.random() * 5}s linear infinite`,
        };
        return <ConfettiPiece key={index} style={style} />;
    });

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            {confetti}
            <div 
                className="bg-slate-800 border-2 border-amber-400 rounded-2xl shadow-2xl text-center p-8 max-w-lg w-full relative z-10"
                style={{ animation: 'modal-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
                <div className="text-7xl mb-4">🏆</div>
                <h2 className="text-4xl font-extrabold text-white">Congratulations!</h2>
                <p className="text-2xl font-semibold text-amber-300 mt-2">Perfect Score!</p>
                <p className="text-gray-300 mt-4">
                    Your hard work and dedication are truly paying off. Keep up the amazing work!
                </p>
                <button
                    onClick={onClose}
                    className="mt-8 bg-amber-500 text-slate-900 font-bold py-3 px-8 rounded-lg hover:bg-amber-400 transition-all transform hover:scale-105"
                >
                    Continue Learning
                </button>
            </div>
        </div>
    );
};

export default Celebration;