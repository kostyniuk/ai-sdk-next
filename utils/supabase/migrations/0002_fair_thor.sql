CREATE TABLE "machine_group" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "material" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quotation_form" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quotation_form_formula" (
	"id" serial PRIMARY KEY NOT NULL,
	"quotation_form_option_id" integer NOT NULL,
	"formula" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quotation_form_option" (
	"id" serial PRIMARY KEY NOT NULL,
	"quotation_form_id" integer NOT NULL,
	"material_id" integer NOT NULL,
	"machine_group_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "quotation_form_formula" ADD CONSTRAINT "quotation_form_formula_quotation_form_option_id_quotation_form_option_id_fk" FOREIGN KEY ("quotation_form_option_id") REFERENCES "public"."quotation_form_option"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quotation_form_option" ADD CONSTRAINT "quotation_form_option_quotation_form_id_quotation_form_id_fk" FOREIGN KEY ("quotation_form_id") REFERENCES "public"."quotation_form"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quotation_form_option" ADD CONSTRAINT "quotation_form_option_material_id_material_id_fk" FOREIGN KEY ("material_id") REFERENCES "public"."material"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quotation_form_option" ADD CONSTRAINT "quotation_form_option_machine_group_id_machine_group_id_fk" FOREIGN KEY ("machine_group_id") REFERENCES "public"."machine_group"("id") ON DELETE cascade ON UPDATE no action;