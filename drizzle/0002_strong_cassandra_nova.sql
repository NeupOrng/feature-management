CREATE TYPE "public"."status" AS ENUM('active', 'delete');--> statement-breakpoint
ALTER TABLE "apps" ADD COLUMN "status" "status" DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE "feature_flags" ADD COLUMN "status" "status" DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "status" "status" DEFAULT 'active' NOT NULL;