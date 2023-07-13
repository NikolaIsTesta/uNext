/*
  Warnings:

  - Added the required column `id_disciplineInfo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "id_disciplineInfo" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_disciplineInfo_fkey" FOREIGN KEY ("id_disciplineInfo") REFERENCES "DisciplineInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
