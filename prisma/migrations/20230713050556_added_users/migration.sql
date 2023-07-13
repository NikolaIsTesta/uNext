-- DropForeignKey
ALTER TABLE "DisciplineInfo" DROP CONSTRAINT "DisciplineInfo_id_student_fkey";

-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_id_optionAnswer_fkey";

-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_id_textAnswer_fkey";

-- AlterTable
ALTER TABLE "Option" ALTER COLUMN "userAnswer" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TextAnswer" ALTER COLUMN "userAnswer" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserAnswer" ALTER COLUMN "id_textAnswer" DROP NOT NULL,
ALTER COLUMN "id_optionAnswer" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_fkey" FOREIGN KEY ("id") REFERENCES "DisciplineInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_id_textAnswer_fkey" FOREIGN KEY ("id_textAnswer") REFERENCES "TextAnswer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_id_optionAnswer_fkey" FOREIGN KEY ("id_optionAnswer") REFERENCES "Option"("id") ON DELETE SET NULL ON UPDATE CASCADE;
