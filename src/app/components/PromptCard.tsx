// src/app/components/PromptCard.tsx

export interface Prompt {
    title: string;
    description: string;
    prompt: string;
    tags: string;
    category: string;
}

const PromptCard: React.FC<{ prompt: Prompt }> = ({ prompt }) => {
    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-4 shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-white mb-2">{prompt.title}</h2>
            <p className="text-gray-400 mb-4">{prompt.description}</p>
            <div className="bg-gray-900 rounded-md p-4 mb-4">
                <p className="text-gray-300 font-mono">{prompt.prompt}</p>
            </div>
            <div className="flex items-center">
                <span className="text-sm font-semibold text-cyan-400 mr-2">Category:</span>
                <span className="text-sm text-gray-300">{prompt.category}</span>
            </div>
            <div className="flex items-center mt-2">
                <span className="text-sm font-semibold text-cyan-400 mr-2">Tags:</span>
                <span className="text-sm text-gray-300">{prompt.tags}</span>
            </div>
        </div>
    );
};

export default PromptCard;