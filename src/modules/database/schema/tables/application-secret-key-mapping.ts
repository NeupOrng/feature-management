import { is, sql } from 'drizzle-orm';
import {
    pgTable,
    uuid,
    varchar,
    text,
    timestamp,
    index,
    boolean,
    unique,
} from 'drizzle-orm/pg-core';

export const applicationSecretKeyMapping = pgTable(
    'application-secret-key-mapping',
    {
        secretKeyId: uuid('secret_key_id').default(sql`gen_random_uuid()`).primaryKey(),
        appId: uuid('app_id').notNull(),
        projectId: uuid('project_id').notNull(),
        createdAt: timestamp('created_at', { withTimezone: true })
            .defaultNow()
            .notNull(),
        updatedAt: timestamp('updated_at', { withTimezone: true })
            .defaultNow()
            .notNull()
            .$onUpdate(() => new Date()),
        isActive: boolean('is_active').default(true).notNull(),
    },
    (table) => ({
        // Unique constraint on the three columns
        uniqueSecretKeyAppProject: unique('uniq_secret_key_app_project').on(
            table.secretKeyId,
            table.appId,
            table.projectId,
        ),

        // Optional: indexes for faster lookups
        appIdIdx: index('idx_app_id').on(table.appId),
        projectIdIdx: index('idx_project_id').on(table.projectId),
    }),
);
