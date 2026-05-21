-- Optional numeric price and scholarship amount for activities
ALTER TABLE "activities" ADD COLUMN IF NOT EXISTS "entryPrice" DECIMAL(12,2);
ALTER TABLE "activities" ADD COLUMN IF NOT EXISTS "scholarshipAmount" DECIMAL(12,2);
ALTER TABLE "activities" ADD COLUMN IF NOT EXISTS "amountCurrency" TEXT NOT NULL DEFAULT 'TRY';
