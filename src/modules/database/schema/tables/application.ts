import {
    pgTable,
    uuid,
    varchar,
    text,
    timestamp,
    index,
    boolean,
    jsonb,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { projects } from './project';
import { status } from '../enums/status.enum';

export const applications = pgTable(
    'applications',
    {
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
        context: jsonb('context')
            .notNull()
            .default({
                idendifierId: {
                    type: 'string',
                    required: true,
                },
                role: {
                    type: 'string',
                    required: true,
                },
                version: {
                    type: 'version',
                    required: true,
                },
            }),
        updatedAt: timestamp('updated_at', { withTimezone: true })
            .defaultNow()
            .notNull()
            .$onUpdate(() => new Date()),
    },
    (table) => ({
        projectIdIdx: index('idx_apps_project_id').on(table.projectId),
    }),
);
