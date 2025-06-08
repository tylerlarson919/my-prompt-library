// components/PromptClient.tsx

"use client";

import React, { useState, useMemo } from 'react';
import { Prompt } from '../lib/types';
import PromptModal from './PromptModal';
import NavItem from './NavItem';
import PromptCard from './PromptCard';

export default function PromptClient({ initialPrompts }: { initialPrompts: Prompt[] }) {
    // REMOVED: const [prompts] = useState<Prompt[]>(initialPrompts);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

    const viewingPrompts = !!selectedTag;

    // UPDATED: Use initialPrompts directly
    const categories = useMemo(() => [...new Set(initialPrompts.map(p => p.category))].sort(), [initialPrompts]);

    // UPDATED: Use initialPrompts directly
    const tagsForSelectedCategory = useMemo(() => {
        if (!selectedCategory) return [];
        const categoryPrompts = initialPrompts.filter(p => p.category === selectedCategory);
        const allTags = categoryPrompts.flatMap(p => p.tags.split(',').map(t => t.trim()));
        return [...new Set(allTags)].sort();
    }, [initialPrompts, selectedCategory]);

    // UPDATED: Use initialPrompts directly
    const promptsForSelectedTag = useMemo(() => {
        if (!selectedTag || !selectedCategory) return [];
        return initialPrompts.filter(p =>
            p.category === selectedCategory &&
            p.tags.split(',').map(t => t.trim()).includes(selectedTag)
        );
    }, [initialPrompts, selectedCategory, selectedTag]);

    const handleCategoryClick = (category: string) => {
        if (selectedCategory === category) {
            setSelectedCategory(null);
            setSelectedTag(null);
        } else {
            setSelectedCategory(category);
            setSelectedTag(null);
        }
    };

    const handleTagClick = (tag: string) => {
        setSelectedTag(prev => (prev === tag ? null : tag));
    };

    return (
        <>
            <div className="flex-grow w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-x-8 gap-y-6 p-4 md:p-8 overflow-y-auto">
                
                {/* Categories Column */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <h2 className="text-sm font-bold tracking-widest text-zinc-500 mb-3 px-2">CATEGORIES</h2>
                    <nav className="flex flex-col space-y-1">
                        {categories.map(category => (
                            <NavItem key={category} text={category} onClick={() => handleCategoryClick(category)} isActive={selectedCategory === category} />
                        ))}
                    </nav>
                </aside>

                {/* Tags Column - now visually fades without placeholder text */}
                <aside className={`w-full md:w-64 flex-shrink-0 transition-opacity duration-300 ease-in-out ${selectedCategory ? 'opacity-100' : 'opacity-50 md:opacity-20 pointer-events-none'}`}>
                    <h2 className="text-sm font-bold tracking-widest text-zinc-500 mb-3 px-2">TAGS</h2>
                    <div className="flex flex-col space-y-1">
                        {selectedCategory && tagsForSelectedCategory.map(tag => (
                            <NavItem key={tag} text={tag} onClick={() => handleTagClick(tag)} isActive={selectedTag === tag} />
                        ))}
                    </div>
                </aside>
                
                {/* This empty div just holds the space on desktop */}
                <div className="flex-grow hidden md:block"></div>

            </div>

            {/* Prompts Drawer */}
            <div className={`fixed bottom-0 left-0 right-0 bg-zinc-900/80 backdrop-blur-md z-30 overflow-y-auto transition-transform duration-500 ease-in-out shadow-[0_-5px_25px_-5px_rgba(0,0,0,0.3)] ${viewingPrompts ? 'translate-y-0 h-3/5 md:h-2/5' : 'translate-y-full h-3/5 md:h-2/5'}`}>
                <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
                    <button onClick={() => setSelectedTag(null)} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 mt-6 md:mt-0">
                        Prompts for "{selectedTag}"
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {promptsForSelectedTag.map((prompt) => (
                            <PromptCard key={prompt.title} prompt={prompt} onClick={() => setSelectedPrompt(prompt)} />
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Prompt Modal */}
            <PromptModal prompt={selectedPrompt} onClose={() => setSelectedPrompt(null)} />
        </>
    );
}