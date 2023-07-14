-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_id_avatar_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id_avatar" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_avatar_fkey" FOREIGN KEY ("id_avatar") REFERENCES "PublicFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
