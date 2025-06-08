import React, { useState, useEffect } from 'react';
import { Prompt } from '../lib/types';

interface PromptModalProps {
    prompt: Prompt | null;
    onClose: () => void;
}

const PromptModal: React.FC<PromptModalProps> = ({ prompt, onClose }) => {
    const [copied, setCopied] = useState(false);
    const [isShowing, setIsShowing] = useState(false);

    useEffect(() => {
        if (prompt) {
            setTimeout(() => setIsShowing(true), 10);
        } else {
            setIsShowing(false);
        }
    }, [prompt]);

    const handleCopy = () => {
        if (!prompt) return;
        navigator.clipboard.writeText(prompt.prompt).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    if (!prompt) return null;

    return (
        <div
            className={`fixed inset-0 bg-black z-50 flex justify-center items-center p-4 transition-opacity duration-300 ${isShowing ? 'bg-opacity-70 opacity-100' : 'bg-opacity-0 opacity-0 pointer-events-none'}`}
            onClick={onClose}
        >
            <div
                className={`bg-zinc-800/95 backdrop-blur-sm rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative transition-all duration-300 ${isShowing ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h2 className="text-3xl font-bold text-white mb-2">{prompt.title}</h2>
                <p className="text-zinc-400 mb-6">{prompt.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-sm font-semibold bg-zinc-700 text-white py-1 px-3 rounded-full">{prompt.category}</span>
                    {prompt.tags.split(',').map(tag => <span key={tag} className="text-sm bg-zinc-600 text-zinc-200 py-1 px-3 rounded-full">{tag.trim()}</span>)}
                </div>
                <div className="bg-zinc-900 rounded-lg p-6 relative">
                    <h3 className="text-lg font-semibold text-white mb-3">Prompt Text</h3>
                    <p className="text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed">{prompt.prompt}</p>
                    <button onClick={handleCopy} className="absolute top-4 right-4 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2">
                        {copied ? (
                            <><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> Copied!</>
                        ) : (
                            <><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Copy</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromptModal;