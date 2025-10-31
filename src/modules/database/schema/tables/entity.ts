import { sql } from 'drizzle-orm';
import { pgTable, varchar, uuid, json } from 'drizzle-orm/pg-core';

export const Entities = pgTable('entities', {
    id: uuid('id')
        .default(sql`gen_random_uuid()`)
        .primaryKey(),
    idendifierId: varchar('name', { length: 255 }),
    role: varchar('role', { length: 255 }),
    customContext: json('custom_context').notNull().default('{}'),
});
