/*
  Warnings:

  - You are about to drop the column `totalMark` on the `UserAnswer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "totalMark" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "UserAnswer" DROP COLUMN "totalMark";
