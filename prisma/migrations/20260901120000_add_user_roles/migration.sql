-- Create the application-level user roles.
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- New accounts are regular users by default.
ALTER TABLE "users"
ADD COLUMN "role" "UserRole" NOT NULL DEFAULT 'USER';

-- Preserve the current admin access for every account that already exists.
UPDATE "users"
SET "role" = 'ADMIN';
