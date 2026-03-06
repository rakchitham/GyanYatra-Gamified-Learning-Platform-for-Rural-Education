
import React, { useState, useEffect, useRef } from 'react';
import { sendMessageToTutorStream, startChat } from '../services/geminiService';
import type { ChatMessage } from '../types';

const AiTutor: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize the chat session when the component mounts
        startChat();
        setMessages([
            { role: 'model', text: 'Hello! I am your GyanYatra AI Tutor. How can I help you learn today?' }
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Add a placeholder for the model's response
        setMessages(prev => [...prev, { role: 'model', text: '' }]);

        try {
            const stream = await sendMessageToTutorStream(input);
            for await (const chunk of stream) {
                const chunkText = chunk.text;
                setMessages(prev => {
                    const lastMessage = prev[prev.length - 1];
                    if (lastMessage && lastMessage.role === 'model') {
                        const updatedMessages = [...prev];
                        updatedMessages[prev.length - 1] = {
                            ...lastMessage,
                            text: lastMessage.text + chunkText,
                        };
                        return updatedMessages;
                    }
                    return prev;
                });
            }
        } catch (error) {
            console.error('Gemini API error:', error);
            setMessages(prev => {
                const updatedMessages = [...prev];
                updatedMessages[prev.length-1] = { role: 'model', text: 'Sorry, I encountered an error. Please try again.' };
                return updatedMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto bg-slate-800 rounded-xl border border-slate-700 shadow-2xl">
            <div className="p-4 border-b border-slate-700">
                <h2 className="text-xl font-bold text-white">AI Tutor</h2>
            </div>
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'model' && (
                             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">AI</div>
                        )}
                        <div className={`max-w-md p-4 rounded-2xl ${msg.role === 'user' ? 'bg-violet-600 text-white rounded-br-none' : 'bg-slate-700 text-gray-200 rounded-bl-none'}`}>
                            <p className="whitespace-pre-wrap">{msg.text || '...'}</p>
                        </div>
                    </div>
                ))}
                 <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-slate-700">
                <div className="flex items-center bg-slate-700 rounded-lg p-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask me anything about STEM..."
                        className="flex-1 bg-transparent focus:outline-none px-2 text-white"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading}
                        className="p-2 rounded-md bg-violet-600 text-white hover:bg-violet-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
                    >
                         {isLoading ? 
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AiTutor;
