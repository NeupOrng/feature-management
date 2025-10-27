import { sql } from 'drizzle-orm';

export const enablePgcrypto = sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`;

// --------------------------
// Tables
// --------------------------

export { projects } from './tables/project';
export { apps } from './tables/app';
export { featureFlags } from './tables/feature-flag'


// --------------------------
// Enums
// --------------------------

export { status, Status, StatusType } from './enums/status.enum';

// --------------------------
// Relations
// --------------------------

export {
    projectsRelations,
    appsRelations,
    featureFlagsRelations,
} from './relation'


// --------------------------
// Types
// --------------------------
export type {
    Project,
    NewProject,
    
    App,
    NewApp,

    FeatureFlag,
    NewFeatureFlag,
} from './types'


