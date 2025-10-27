import { relations } from "drizzle-orm";
import { projects } from "./tables/project";
import { apps } from "./tables/app";
import { featureFlags } from "./tables/feature-flag";


export const projectsRelations = relations(projects, ({ many }) => ({
  apps: many(apps),
}));

export const appsRelations = relations(apps, ({ one, many }) => ({
  project: one(projects, {
    fields: [apps.projectId],
    references: [projects.projectId],
  }),
  featureFlags: many(featureFlags),
}));

export const featureFlagsRelations = relations(featureFlags, ({ one }) => ({
  app: one(apps, {
    fields: [featureFlags.appId],
    references: [apps.appId],
  }),
}));