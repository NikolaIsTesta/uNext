/*
  Warnings:

  - You are about to drop the column `userAnswer` on the `Option` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Option" DROP COLUMN "userAnswer";

-- AlterTable
ALTER TABLE "UserAnswer" ADD COLUMN     "userOptionAnswer" BOOLEAN,
ADD COLUMN     "userTextAnswer" TEXT;
