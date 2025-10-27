ALTER TABLE "apps" RENAME TO "applications";--> statement-breakpoint
ALTER TABLE "applications" DROP CONSTRAINT "apps_project_id_projects_project_id_fk";
--> statement-breakpoint
ALTER TABLE "feature_flags" DROP CONSTRAINT "feature_flags_app_id_apps_app_id_fk";
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_project_id_projects_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("project_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feature_flags" ADD CONSTRAINT "feature_flags_app_id_applications_app_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."applications"("app_id") ON DELETE cascade ON UPDATE no action;