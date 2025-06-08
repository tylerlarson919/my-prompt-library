// src/app/page.tsx

import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import PromptCard, { Prompt } from './components/PromptCard';

async function getPrompts(): Promise<Prompt[]> {
  const csvFilePath = path.join(process.cwd(), 'public', 'prompts.csv');
  const csvFile = fs.readFileSync(csvFilePath, 'utf8');
  return new Promise(resolve => {
    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data as Prompt[]);
      }
    });
  });
}

export default async function Home() {
  const prompts = await getPrompts();
  const tradingPrompts = prompts.filter(p => p.category === 'Trading');

  return (
    <main className="bg-gray-900 min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold text-white text-center mb-2">
          My Prompt Library
        </h1>
        <p className="text-center text-gray-400 mb-12">A collection of powerful prompts for various tasks.</p>

        <div>
          <h2 className="text-3xl font-bold text-cyan-400 mb-6 border-b-2 border-cyan-400 pb-2">
            Trading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tradingPrompts.map((prompt, index) => (
              <PromptCard key={index} prompt={prompt} />
            ))}
          </div>
        </div>
        {/* You can add more sections here for other categories in the future */}
      </div>
    </main>
  );
}