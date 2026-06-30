ALTER TABLE "activities"
ALTER COLUMN "scholarshipAmount" TYPE TEXT
USING "scholarshipAmount"::TEXT;
