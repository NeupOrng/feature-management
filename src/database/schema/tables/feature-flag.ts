import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  index,
  boolean,
  numeric,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { apps } from './app'
import { status } from '../enums/status.enum';

export const featureFlags = pgTable('feature_flags', {
  flagId: uuid('flag_id')
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  appId: uuid('app_id')
    .notNull()
    .references(() => apps.appId, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  enabled: boolean('enabled').default(false).notNull(),
  status: status('status').notNull().default('active'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
}, (table) => ({
  appIdIdx: index('idx_feature_flags_app_id').on(table.appId),
}));