/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `PublicFile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PublicFile" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "publicfile_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "PublicFile_id_key" ON "PublicFile"("id");
