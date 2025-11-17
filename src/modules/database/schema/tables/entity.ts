import { sql } from 'drizzle-orm';
import { pgTable, varchar, uuid, json, timestamp } from 'drizzle-orm/pg-core';

export const entities = pgTable('entities', {
    id: uuid('id')
        .default(sql`gen_random_uuid()`)
        .primaryKey(),
    applicationId: uuid('application_id').notNull(),
    idendifierId: varchar('name', { length: 255 }).notNull(),
    role: varchar('role', { length: 255 }).notNull(),
    version: varchar('version', { length: 255 }).notNull().default('1.0.0'),
    customContext: json('custom_context').notNull().default({}),
    userFeatureFlag: json('user_feature_flag').notNull().default({}),
    createdAt: timestamp('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
});
