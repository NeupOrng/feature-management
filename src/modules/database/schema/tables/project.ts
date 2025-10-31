import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { status } from '../enums/status.enum';

export const projects = pgTable(
  'projects',
  {
    projectId: uuid('project_id')
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    name: varchar('name', { length: 255 }).notNull().unique(),
    description: text('description'),
    status: status('status').notNull().default('active'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    projectNameIdx: index('idx_projects_name').on(table.name),
  }),
);
