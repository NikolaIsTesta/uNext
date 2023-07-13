/*
  Warnings:

  - Made the column `totalMark` on table `UserAnswer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserAnswer" ALTER COLUMN "totalMark" SET NOT NULL,
ALTER COLUMN "totalMark" SET DEFAULT 0;
