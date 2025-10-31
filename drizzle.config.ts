import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/modules/database/schema/index.ts', // We'll create this file next
  out: './drizzle', // Migration output directory
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/feature-management',
  },
});