-- Add missing ActivityCategory enum values used by the app schema
ALTER TYPE "ActivityCategory" ADD VALUE IF NOT EXISTS 'SCHOLARSHIP';
ALTER TYPE "ActivityCategory" ADD VALUE IF NOT EXISTS 'PLATFORM';
