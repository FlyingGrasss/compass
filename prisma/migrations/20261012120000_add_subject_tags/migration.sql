-- AlterTable
ALTER TABLE "activities" ADD COLUMN "subjectTags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];