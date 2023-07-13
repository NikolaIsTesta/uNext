-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_id_task_fkey";

-- AlterTable
ALTER TABLE "UserAnswer" ALTER COLUMN "id_task" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_id_task_fkey" FOREIGN KEY ("id_task") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
