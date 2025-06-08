import React from 'react';
import { Prompt } from '../lib/types';

interface PromptCardProps {
    prompt: Prompt;
    onClick: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onClick }) => (
    <div
        onClick={onClick}
        className="p-4 rounded-lg transition-colors duration-200 cursor-pointer hover:bg-white/5"
    >
        <h3 className="text-lg font-bold text-white mb-1">{prompt.title}</h3>
        <p className="text-zinc-400 text-sm line-clamp-3">{prompt.description}</p>
    </div>
);

export default PromptCard;