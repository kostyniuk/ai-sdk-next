import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').notNull().unique(),
});

export const postsTable = pgTable('posts_table', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const notesTable = pgTable('notes', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
});


export const material = pgTable('material', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
});

export const machineGroup = pgTable('machine_group', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const quotationForm = pgTable('quotation_form', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const quotationFormOption = pgTable('quotation_form_option', {
  id: serial('id').primaryKey(),
  quotationFormId: integer('quotation_form_id')
    .notNull()
    .references(() => quotationForm.id, { onDelete: 'cascade' }),
    materialId: integer('material_id')
    .notNull()
    .references(() => material.id, { onDelete: 'cascade' }),
  machineGroupId: integer('machine_group_id')
    .notNull()
    .references(() => machineGroup.id, { onDelete: 'cascade' }),
  }
);

export const quotationFormFormula = pgTable('quotation_form_formula', {
  id: serial('id').primaryKey(),
  quotationFormOptionId: integer('quotation_form_option_id')
    .notNull()
    .references(() => quotationFormOption.id, { onDelete: 'cascade' }),
  formula: text('formula').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull().defaultNow().$onUpdate(() => new Date()),
});


export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;

export type InsertNote = typeof notesTable.$inferInsert;
export type SelectNote = typeof notesTable.$inferSelect;

export type InsertMaterial = typeof material.$inferInsert;
export type SelectMaterial = typeof material.$inferSelect;

export type InsertMachineGroup = typeof machineGroup.$inferInsert;
export type SelectMachineGroup = typeof machineGroup.$inferSelect;

export type InsertQuotationForm = typeof quotationForm.$inferInsert;
export type SelectQuotationForm = typeof quotationForm.$inferSelect;

export type InsertQuotationFormOption = typeof quotationFormOption.$inferInsert;
export type SelectQuotationFormOption = typeof quotationFormOption.$inferSelect;