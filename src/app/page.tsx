// app/page.tsx

import { fetchPrompts } from './lib/data'; 
import PromptClient from './components/PromptClient';

export const revalidate = 0;

export default async function HomePage() {
  // 1. Fetch data on the server at build time
  const initialPrompts = await fetchPrompts();

  return (
    <main className="bg-zinc-900 min-h-screen w-full text-white flex flex-col font-sans">
      <header className="text-center py-6 md:py-8 border-b border-zinc-800/50">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">Prompt Library</h1>
        <p className="text-zinc-400 text-base md:text-lg px-4">
          Select a category, then a tag to find prompts.
        </p>
      </header>
      
      {/* 2. Pass the data to the interactive Client Component */}
      <PromptClient initialPrompts={initialPrompts} />
    </main>
  );
}