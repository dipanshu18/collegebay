/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `Feedback` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Feedback_postId_customerId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_postId_key" ON "Feedback"("postId");
