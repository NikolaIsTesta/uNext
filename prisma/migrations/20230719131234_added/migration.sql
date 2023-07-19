/*
  Warnings:

  - You are about to drop the column `answerMark` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `questionMark` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `studentMark` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `studentMark` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "answerMark",
DROP COLUMN "questionMark";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "studentMark";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "studentMark";

-- CreateTable
CREATE TABLE "StudentResult" (
    "id" SERIAL NOT NULL,
    "id_student" INTEGER NOT NULL,
    "studentMark" INTEGER NOT NULL DEFAULT 0,
    "id_task" INTEGER NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "StudentResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentResult" ADD CONSTRAINT "StudentResult_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
