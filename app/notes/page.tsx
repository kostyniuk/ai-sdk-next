import { db } from '@/db';
import { notesTable } from '@/db/schema';
import { createClient } from '@/utils/supabase/server';

export default async function Notes() {
    const supabase = await createClient();
    const notes = await db.select().from(notesTable);

    return <pre> Notes: {JSON.stringify(notes, null, 2)}</pre>
}