-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_id_disciplineInfo_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id_disciplineInfo" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_disciplineInfo_fkey" FOREIGN KEY ("id_disciplineInfo") REFERENCES "DisciplineInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
