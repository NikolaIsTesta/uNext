/*
  Warnings:

  - Made the column `url` on table `PublicFile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `key` on table `PublicFile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_avatar` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_id_avatar_fkey";

-- AlterTable
ALTER TABLE "PublicFile" ALTER COLUMN "url" SET NOT NULL,
ALTER COLUMN "key" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id_avatar" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_avatar_fkey" FOREIGN KEY ("id_avatar") REFERENCES "PublicFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
