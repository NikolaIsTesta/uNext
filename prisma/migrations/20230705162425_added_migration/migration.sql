-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'TEACHER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "id_teacher" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "storage" VARCHAR(255),

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisciplineInfo" (
    "id" SERIAL NOT NULL,
    "id_subject" INTEGER NOT NULL,
    "id_student" INTEGER NOT NULL,

    CONSTRAINT "DisciplineInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_id_teacher_fkey" FOREIGN KEY ("id_teacher") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisciplineInfo" ADD CONSTRAINT "DisciplineInfo_id_subject_fkey" FOREIGN KEY ("id_subject") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisciplineInfo" ADD CONSTRAINT "DisciplineInfo_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
