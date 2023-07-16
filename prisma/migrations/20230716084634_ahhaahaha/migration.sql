/*
  Warnings:

  - You are about to drop the column `neededMark` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "neededMark",
ADD COLUMN     "studentMark" INTEGER DEFAULT 0,
ALTER COLUMN "totalMark" DROP NOT NULL;
