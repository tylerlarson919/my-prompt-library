// lib/data.ts

import Papa from 'papaparse';
import { Prompt } from './types';

const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQsLXNWA_JQwGhD4-N9UsSG3i9YjH-Ny7aqdjgoGR9KNIjD8AS8QsbiBo8J2ez-9NzUC2II0SFGE5zx/pub?output=csv';

export const fetchPrompts = async (): Promise<Prompt[]> => {
    try {
        // Use fetch to get data. This works on the server.
        // Add revalidation to refetch data periodically without needing a new build.
        const response = await fetch(GOOGLE_SHEET_URL, { next: { revalidate: 3600 } });

        if (!response.ok) {
            throw new Error(`Failed to fetch CSV data: ${response.statusText}`);
        }

        const csvText = await response.text();

        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const data = results.data as any[];
                    const prompts: Prompt[] = data
                        .map(row => ({
                            title: row.title || '',
                            description: row.description || '',
                            prompt: row.prompt || '',
                            tags: row.tags || '',
                            category: row.category || '',
                        }))
                        .filter(p => p.title && p.description && p.prompt && p.tags && p.category);
                    resolve(prompts);
                },
                error: (error: Error) => {
                    console.error("Error parsing CSV:", error);
                    reject(error);
                },
            });
        });
    } catch (error) {
        console.error("Error in fetchPrompts:", error);
        return []; // Return empty array on error to prevent crashes
    }
};