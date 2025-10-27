import { relations } from "drizzle-orm";
import { projects } from "./tables/project";
import { applications } from "./tables/application";
import { featureFlags } from "./tables/feature-flag";


export const projectsRelations = relations(projects, ({ many }) => ({
  applications: many(applications),
}));

export const applicationsRelations = relations(applications, ({ one, many }) => ({
  project: one(projects, {
    fields: [applications.projectId],
    references: [projects.projectId],
  }),
  featureFlags: many(featureFlags),
}));

export const featureFlagsRelations = relations(featureFlags, ({ one }) => ({
  application: one(applications, {
    fields: [featureFlags.appId],
    references: [applications.appId],
  }),
}));