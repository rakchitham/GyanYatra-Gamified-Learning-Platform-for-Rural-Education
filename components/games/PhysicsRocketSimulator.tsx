import React, { useState, useRef, useEffect, useCallback } from 'react';

const GRAVITY = 0.05; // A smaller value for pixel-based simulation

const PhysicsRocketSimulator: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [angle, setAngle] = useState(45);
    const [velocity, setVelocity] = useState(5);
    const [gameState, setGameState] = useState<'ready' | 'firing' | 'success' | 'fail'>('ready');
    const [feedback, setFeedback] = useState('Adjust angle and velocity to hit the moon!');

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);

        // Draw Ground
        ctx.fillStyle = '#475569'; // slate-600
        ctx.fillRect(0, height - 20, width, 20);
        
        // Draw Moon Target
        ctx.fillStyle = '#e2e8f0'; // slate-200
        ctx.beginPath();
        ctx.arc(width * 0.8, height * 0.2, 20, 0, Math.PI * 2);
        ctx.fill();

        // Draw Rocket Launcher
        ctx.save();
        ctx.translate(50, height - 20);
        ctx.rotate(-angle * Math.PI / 180);
        ctx.fillStyle = '#f8fafc'; // slate-50
        ctx.fillRect(-10, -40, 20, 40);
        ctx.restore();

    }, [angle]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        // Handle responsive canvas
        const resizeCanvas = () => {
            const container = canvas.parentElement;
            if (container) {
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
                draw();
            }
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, [draw]);

    const handleLaunch = () => {
        if (gameState === 'firing') return;
        setGameState('firing');
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let rocket = { x: 50, y: canvas.height - 20 };
        const rad = angle * Math.PI / 180;
        let vx = velocity * Math.cos(rad);
        let vy = -velocity * Math.sin(rad); // y is inverted in canvas

        const moon = { x: canvas.width * 0.8, y: canvas.height * 0.2, r: 20 };

        const animate = () => {
            draw(); // Redraw background
            vy += GRAVITY;
            rocket.x += vx;
            rocket.y += vy;

            // Draw rocket
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(rocket.x, rocket.y, 5, 0, Math.PI * 2);
            ctx.fill();

            // Check collision with moon
            const dist = Math.sqrt(Math.pow(rocket.x - moon.x, 2) + Math.pow(rocket.y - moon.y, 2));
            if (dist < moon.r) {
                setGameState('success');
                setFeedback('Mission Success! You landed on the moon!');
                return;
            }

            // Check collision with ground or out of bounds
            if (rocket.y > canvas.height - 20 || rocket.x > canvas.width) {
                setGameState('fail');
                setFeedback('Mission Failed. The rocket crashed. Try adjusting your parameters.');
                // Redraw one last time to show final state
                setTimeout(draw, 10);
                return;
            }
            requestAnimationFrame(animate);
        };
        animate();
    };
    
    const handleReset = () => {
        setGameState('ready');
        setFeedback('Adjust angle and velocity to hit the moon!');
        draw();
    };
    
    const isButtonDisabled = gameState === 'firing';

    return (
        <div className="flex flex-col lg:flex-row gap-4 w-full h-[70vh] max-h-[600px]">
            <div className="lg:w-1/3 bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-violet-400">Rocket Controls</h3>
                    <div className="my-4">
                        <label htmlFor="angle" className="block font-medium text-white">Angle: {angle}°</label>
                        <input id="angle" type="range" min="0" max="90" value={angle} onChange={e => setAngle(Number(e.target.value))} className="w-full" disabled={isButtonDisabled} />
                    </div>
                    <div className="my-4">
                        <label htmlFor="velocity" className="block font-medium text-white">Velocity: {velocity}</label>
                        <input id="velocity" type="range" min="1" max="15" step="0.5" value={velocity} onChange={e => setVelocity(Number(e.target.value))} className="w-full" disabled={isButtonDisabled} />
                    </div>
                </div>
                <div>
                     <p className={`text-sm p-2 rounded ${gameState === 'success' ? 'bg-green-500/20 text-green-300' : gameState === 'fail' ? 'bg-red-500/20 text-red-300' : 'text-gray-400'}`}>
                        {feedback}
                    </p>
                    <div className="flex gap-2 mt-2">
                    <button onClick={handleLaunch} disabled={isButtonDisabled} className="w-full bg-violet-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-violet-700 disabled:bg-slate-600">
                        Launch 🚀
                    </button>
                    <button onClick={handleReset} className="w-full bg-slate-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-500">
                        Reset
                    </button>
                    </div>
                </div>
            </div>
            <div className="flex-1 h-full bg-slate-700/50 rounded-lg overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full"></canvas>
            </div>
        </div>
    );
};

export default PhysicsRocketSimulator;
