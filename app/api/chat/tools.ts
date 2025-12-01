import { db } from "@/db";
import { material, machineGroup, quotationForm, quotationFormOption, SelectMaterial, quotationFormFormula } from "@/db/schema";
import { tool } from "ai";
import { z } from "zod";    
import { eq } from "drizzle-orm";

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