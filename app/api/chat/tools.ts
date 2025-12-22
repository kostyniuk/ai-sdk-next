import { db } from "@/db";
import { material, machineGroup, quotationForm, quotationFormOption, SelectMaterial, quotationFormFormula } from "@/db/schema";
import { tool } from "ai";
import { z } from 'zod/v3';    
import { eq } from "drizzle-orm";

const weatherTool = tool({
  description: "Get the weather in a location",
  inputSchema: z.object({
    location: z.string().describe("The location to get the weather for"),
  }),
  execute: ({ location }) => ({
    temperature: 72 + Math.floor(Math.random() * 21) - 10,
  }),
  // toModelOutput can be sync or async
  toModelOutput: async ({ input, output, toolCallId }) => {
    // many other options, including json, multi-part with files and images, etc.
    // (support depends on provider)
    // example: send tool output as a text
    return {
      type: "text",
      value:
        `The weather in ${input.location} is ${output.temperature}°F.`,
    };
  },
});

export const tools = {
    listMaterials: tool({
        description: 'List all materials that are available',
        inputSchema: z.object({}),
        execute: async (): Promise<SelectMaterial[]> => {
            return db.select().from(material);
        },
    }),
    listMachineGroups: tool({
        description: 'List all machine groups that are available',
        inputSchema: z.object({}),
        execute: async () => {
            const machineGroups = await db.select().from(machineGroup);
            return machineGroups;
        },
    }),
    listQuotationForms: tool({
        description: 'List all quotation forms that are available',
        inputSchema: z.object({}),
        execute: async () => {
            const quotationForms = await db.select().from(quotationForm);
            return quotationForms;
        },
    }),
    listQuotationOptions: tool({
        description: 'List all quotation options that are available, if material is provided, list the options for that material, if not provided, list all options',
        inputSchema: z.object({materialId: z.number().describe('The ID of the material')}),
        execute: async ({ materialId }: { materialId: number }) => {
            const where = materialId ? eq(quotationFormOption.materialId, materialId) : undefined;
            const quotationOptions = await db.select().from(quotationFormOption).where(where);
            return quotationOptions;
        },
    }),
    listQuotationFormulas: tool({
        description: 'List all quotation formulas that are available, if quotation option is provided, list the formulas for that option, if not provided, list all formulas',
        inputSchema: z.object({quotationOptionId: z.number().describe('The ID of the quotation option')}),
        execute: async ({ quotationOptionId }: { quotationOptionId: number }) => {
            const where = quotationOptionId ? eq(quotationFormFormula.quotationFormOptionId, quotationOptionId) : undefined;
            const quotationFormulas = await db.select().from(quotationFormFormula).where(where);
            return quotationFormulas;
        },
    }),
}