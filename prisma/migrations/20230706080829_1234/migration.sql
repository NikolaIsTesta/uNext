/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `PublicFile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "id_avatar" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "PublicFile_key_key" ON "PublicFile"("key");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_avatar_fkey" FOREIGN KEY ("id_avatar") REFERENCES "PublicFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
