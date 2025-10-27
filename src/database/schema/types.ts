import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { projects } from './tables/project';
import { apps } from './tables/app';
import { featureFlags } from './tables/feature-flag';
import { status } from './enums/status.enum';

export type Project = InferSelectModel<typeof projects>;
export type NewProject = InferInsertModel<typeof projects>;

export type App = InferSelectModel<typeof apps>;
export type NewApp = InferInsertModel<typeof apps>;

export type FeatureFlag = InferSelectModel<typeof featureFlags>;
export type NewFeatureFlag = InferInsertModel<typeof featureFlags>;