import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  index,
  boolean,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { projects } from './project';
import { status } from '../enums/status.enum';

export const apps = pgTable('apps', {
  appId: uuid('app_id')
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.projectId, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  status: status('status').notNull().default('active'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
}, (table) => ({
  projectIdIdx: index('idx_apps_project_id').on(table.projectId),
}));