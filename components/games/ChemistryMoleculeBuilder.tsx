import React, { useState } from 'react';

const ATOMS = [
    { id: 'H', name: 'Hydrogen', color: 'bg-blue-300' },
    { id: 'O', name: 'Oxygen', color: 'bg-red-400' },
    { id: 'C', name: 'Carbon', color: 'bg-gray-500' },
];

const MOLECULES = [
    { name: 'Water', formula: 'H₂O', components: { H: 2, O: 1 } },
    { name: 'Carbon Dioxide', formula: 'CO₂', components: { C: 1, O: 2 } },
    { name: 'Methane', formula: 'CH₄', components: { C: 1, H: 4 } },
];

const ChemistryMoleculeBuilder: React.FC = () => {
    const [workspace, setWorkspace] = useState<string[]>([]);
    const [challengeIndex, setChallengeIndex] = useState(0);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'fail' | null; key: number }>({ type: null, key: 0 });
    const [score, setScore] = useState(0);

    const currentMolecule = MOLECULES[challengeIndex];

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const atomId = e.dataTransfer.getData('atomId');
        if (atomId) {
            setWorkspace(prev => [...prev, atomId]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const checkMolecule = () => {
        const workspaceCounts: { [key: string]: number } = workspace.reduce((acc, atom) => {
            acc[atom] = (acc[atom] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });
        
        const requiredCounts = currentMolecule.components;
        const isCorrect = 
            Object.keys(requiredCounts).length === Object.keys(workspaceCounts).length &&
            Object.keys(requiredCounts).every(key => requiredCounts[key] === workspaceCounts[key]);

        if (isCorrect) {
            setFeedback({ type: 'success', key: Date.now() });
            setScore(prev => prev + 100);
            setTimeout(() => {
                setChallengeIndex(prev => (prev + 1) % MOLECULES.length);
                setWorkspace([]);
                setFeedback({ type: null, key: 0 });
            }, 1500);
        } else {
            setFeedback({ type: 'fail', key: Date.now() });
            setScore(prev => prev > 0 ? prev - 10 : 0);
            setTimeout(() => {
                setWorkspace([]);
                setFeedback({ type: null, key: 0 });
            }, 1000);
        }
    };

    const Atom: React.FC<{ id: string; color: string }> = ({ id, color }) => (
        <div
            draggable
            onDragStart={(e) => e.dataTransfer.setData('atomId', id)}
            className={`${color} w-12 h-12 rounded-full flex items-center justify-center text-slate-900 font-bold text-xl cursor-grab active:cursor-grabbing`}
        >
            {id}
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row gap-8 w-full">
            <div className="md:w-1/3 bg-slate-800 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-violet-400">Atom Palette</h3>
                <div className="flex justify-around mt-4">
                    {ATOMS.map(atom => <Atom key={atom.id} id={atom.id} color={atom.color} />)}
                </div>
                <div className="mt-8 text-center">
                    <p className="font-bold text-white text-lg">Your Score: <span className="text-amber-400">{score}</span></p>
                    <p className="text-gray-400 mt-4">Drag atoms into the workspace to build the target molecule.</p>
                </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-700/50 rounded-lg min-h-[300px]">
                <h2 className="text-2xl font-bold text-white mb-4">Build: <span className="text-amber-300">{currentMolecule.name} ({currentMolecule.formula})</span></h2>
                <div 
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="w-full h-48 bg-slate-800/50 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center p-4 flex-wrap gap-2"
                >
                    {workspace.map((atomId, i) => {
                         const atom = ATOMS.find(a => a.id === atomId);
                         return <div key={i} className={`${atom?.color} w-10 h-10 rounded-full flex items-center justify-center text-slate-900 font-bold`}>{atomId}</div>
                    })}
                    {feedback.type === 'success' && <div key={feedback.key} className="text-4xl" style={{animation: 'molecule-form 0.5s ease-out'}}>{currentMolecule.formula}</div>}
                    {feedback.type === 'fail' && <div key={feedback.key} className="text-6xl" style={{animation: 'molecule-explode 0.5s ease-in'}}>💥</div>}
                </div>
                <button onClick={checkMolecule} className="mt-6 bg-violet-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-violet-700">Check Molecule</button>
            </div>
        </div>
    );
};

export default ChemistryMoleculeBuilder;
