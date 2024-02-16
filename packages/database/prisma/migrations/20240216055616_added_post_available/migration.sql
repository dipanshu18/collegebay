-- CreateEnum
CREATE TYPE "Available" AS ENUM ('AVAILABLE', 'SOLD');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "available" "Available" NOT NULL DEFAULT 'AVAILABLE';
