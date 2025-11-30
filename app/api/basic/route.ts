import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    
    const { text } = await generateText({
        model: google('gemini-2.5-flash'),
        prompt: 'Write a vegetarian lasagna recipe for 4 people.' + 
        'Return only the recipe, no other text.' +
        'The recipe should be in the following format: ' +
        'Ingredients: ' +
        '1. Ingredient 1' +
        '2. Ingredient 2' +
        '3. Ingredient 3' +
        'Instructions: ' +
        '1. Step 1' +
        '2. Step 2'
    });

  return NextResponse.json({ text });
}
