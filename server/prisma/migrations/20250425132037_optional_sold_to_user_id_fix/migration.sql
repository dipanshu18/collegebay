-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_soldToUserId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "soldToUserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_soldToUserId_fkey" FOREIGN KEY ("soldToUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
