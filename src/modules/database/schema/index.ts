import { sql } from 'drizzle-orm';

export const enablePgcrypto = sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`;

// --------------------------
// Tables
// --------------------------

export { projects } from './tables/project';
export { applications } from './tables/application';
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
    applicationsRelations,
    featureFlagsRelations,
} from './relation'


// --------------------------
// Types
// --------------------------
export type {
    Project,
    NewProject,
    
    Application,
    NewApplication,
    UpdateApplication,

    FeatureFlag,
    NewFeatureFlag,
} from './types'


