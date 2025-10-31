CREATE TABLE "application-secret-key-mapping" (
	"secret_key_id" uuid PRIMARY KEY NOT NULL,
	"app_id" uuid NOT NULL,
	"project_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "uniq_secret_key_app_project" UNIQUE("secret_key_id","app_id","project_id")
);
--> statement-breakpoint
CREATE INDEX "idx_app_id" ON "application-secret-key-mapping" USING btree ("app_id");--> statement-breakpoint
CREATE INDEX "idx_project_id" ON "application-secret-key-mapping" USING btree ("project_id");