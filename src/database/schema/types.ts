import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { projects } from './tables/project';
import { applications } from './tables/application';
import { featureFlags } from './tables/feature-flag';

export type Project = InferSelectModel<typeof projects>;
export type NewProject = InferInsertModel<typeof projects>;

export type Application = InferSelectModel<typeof applications>;
export type NewApplication = InferInsertModel<typeof applications>;
export type UpdateApplication = Partial<NewApplication>;

export type FeatureFlag = InferSelectModel<typeof featureFlags>;
export type NewFeatureFlag = InferInsertModel<typeof featureFlags>;