/*
  Warnings:

  - You are about to drop the column `id_disciplineInfo` on the `User` table. All the data in the column will be lost.
  - Made the column `userAnswer` on table `Option` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userAnswer` on table `TextAnswer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_id_disciplineInfo_fkey";

-- AlterTable
ALTER TABLE "Option" ALTER COLUMN "userAnswer" SET NOT NULL;

-- AlterTable
ALTER TABLE "TextAnswer" ALTER COLUMN "userAnswer" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "id_disciplineInfo";

-- AddForeignKey
ALTER TABLE "DisciplineInfo" ADD CONSTRAINT "DisciplineInfo_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
