/*
  Warnings:

  - A unique constraint covering the columns `[postId,customerId]` on the table `Feedback` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Feedback_postId_customerId_key" ON "Feedback"("postId", "customerId");
