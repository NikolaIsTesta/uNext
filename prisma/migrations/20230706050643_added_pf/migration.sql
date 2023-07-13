-- CreateTable
CREATE TABLE "PublicFile" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "PublicFile_pkey" PRIMARY KEY ("id")
);
