import { db } from '@/db';
import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

async function resetDatabase() {
  // Truncate all tables and restart identities to ensure IDs start from 1
  // This is crucial for the seed script which assumes IDs 1-5
  await db.execute(sql.raw(`
    TRUNCATE TABLE 
      quotation_form_formula, 
      quotation_form_option, 
      quotation_form, 
      machine_group, 
      material 
    RESTART IDENTITY CASCADE;
  `));
}

export async function GET() {
  try {
    await resetDatabase();
    return NextResponse.json({ message: 'Database data reset successfully' });
  } catch (error) {
    console.error('Error resetting database:', error);
    return NextResponse.json({ error: 'Failed to reset database' }, { status: 500 });
  }
}
