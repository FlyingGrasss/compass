-- Add optional age information for users and optional age eligibility for activities.
ALTER TABLE "users" ADD COLUMN "age" INTEGER;

ALTER TABLE "activities"
  ADD COLUMN "minAge" INTEGER,
  ADD COLUMN "maxAge" INTEGER;
