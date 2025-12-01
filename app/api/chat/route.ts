import { google } from '@ai-sdk/google';
import { streamText, UIMessage, convertToModelMessages, stepCountIs } from 'ai';
import { tools } from './tools';

const systemPrompt = `
You are a helpful assistant that helps the user with the following tasks:
- Generate a quotation for a project based on the user's requirements
- Calculate the total cost of a project based on the user's requirements
- Provide a list of materials and machine groups that are available
- Provide a list of options for each material and machine group
- Provide a list of formulas for each material and machine group
- Provide a list of options for each formula
- Provide a list of formulas for each option
- Provide a list of options for each formula
- If the user asks for a list of materials, machine groups, quotation forms, or options, use the tools provided to get the information
- Use tools to get the information, do not make up the information
- If you have tools to list data, you can use that tool to find information as well. For example if user asks for a material with a specific name, you can use the list materials tool to find the material and then use the list options tool to find the options for that material.
- Combine tools one with another to get the information you need. For example to find complimentary material and machine group list quotation options and the information can be inferred from the options.
`;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    messages: convertToModelMessages(messages),
    tools,
    stopWhen: [stepCountIs(10)],
  });

  return result.toUIMessageStreamResponse();
}