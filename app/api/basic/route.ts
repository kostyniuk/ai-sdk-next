import { google } from '@ai-sdk/google';
import { generateObject, generateText } from 'ai';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
    name: z.string().describe('The name of the recipe'),
    ingredients: z.array(
        z.object({
            name: z.string().describe('The name of the ingredient'),
            quantity: z.number().describe('The quantity of the ingredient'),
            unit: z.string().describe('The unit of the ingredient'),
        })
    ).describe('The ingredients of the recipe'),
    instructions: z.array(
        z.string().describe('The description of the step'),
    ).describe('The instructions of the recipe'),
}).describe('The recipe schema');

export async function GET(request: Request) {
    
    const { object } = await generateObject({
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
        '2. Step 2',
        schema,
    });

  return NextResponse.json({ object });
}
