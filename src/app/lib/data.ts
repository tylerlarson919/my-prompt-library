import Papa from 'papaparse';
import { Prompt } from './types';

const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQsLXNWA_JQwGhD4-N9UsSG3i9YjH-Ny7aqdjgoGR9KNIjD8AS8QsbiBo8J2ez-9NzUC2II0SFGE5zx/pub?output=csv';

export const fetchPrompts = async (): Promise<Prompt[]> => {
    try {
        const response = await fetch(GOOGLE_SHEET_URL, { cache: 'no-store' });

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
                            // UPDATED: Use capitalized headers to match the Google Sheet.
                            title: row.Title || '',
                            description: row.Description || '',
                            prompt: row.Prompt || '',
                            tags: row.Tags || '',
                            category: row.Category || '',
                        }))
                        // This filter removes any rows that don't have all required fields.
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