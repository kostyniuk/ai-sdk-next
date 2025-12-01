import { db } from '@/db';
import { material, machineGroup, quotationForm, quotationFormOption, quotationFormFormula } from '@/db/schema';
import { ChatInterface } from '@/components/chat-interface';
import { DataList } from '@/components/data-list';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const materials = await db.select().from(material);
  const machineGroups = await db.select().from(machineGroup);
  const quotationForms = await db.select().from(quotationForm);
  const quotationFormOptions = await db.select().from(quotationFormOption);
  const quotationFormFormulas = await db.select().from(quotationFormFormula);

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-[300px] p-4 border-r border-border hidden xl:flex flex-col gap-4 overflow-y-auto h-screen bg-muted/10">
        <div className="space-y-4 pb-10">
          <h2 className="text-lg font-semibold px-1">Resources</h2>
          <DataList title="Materials" data={materials} columns={['id', 'name', 'description']} />
          <DataList title="Machine Groups" data={machineGroups} columns={['id', 'name']} />
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-screen relative">
        <ChatInterface />
      </main>

      {/* Right Sidebar */}
      <aside className="w-[300px] p-4 border-l border-border hidden xl:flex flex-col gap-4 overflow-y-auto h-screen bg-muted/10">
        <div className="space-y-4 pb-10">
          <h2 className="text-lg font-semibold px-1">Quotations</h2>
          <DataList title="Quotation Forms" data={quotationForms} columns={['id', 'name']} />
          <DataList title="Form Options" data={quotationFormOptions} columns={['id', 'quotationFormId', 'materialId', 'machineGroupId']} />
          <DataList title="Form Formulas" data={quotationFormFormulas} columns={['id', 'formula']} />
        </div>
      </aside>
    </div>
  );
}