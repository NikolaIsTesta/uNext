-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'TEACHER');

-- CreateEnum
CREATE TYPE "TypeOfQuestion" AS ENUM ('VICTORINA', 'TEXTANSWER');

-- CreateTable
CREATE TABLE "PublicFile" (
    "id" SERIAL NOT NULL,
    "url" TEXT DEFAULT 'https://nestjs-onlyup-public-bucket.s3.amazonaws.com/default.png',
    "key" TEXT DEFAULT 'default.png',

    CONSTRAINT "PublicFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "date_registration" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentMark" INTEGER DEFAULT 0,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "id_avatar" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "id_teacher" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "storage" VARCHAR(255) DEFAULT '.uploads/default.jpg',
    "deadline" TIMESTAMP(3),

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisciplineInfo" (
    "id" SERIAL NOT NULL,
    "id_subject" INTEGER NOT NULL,
    "id_student" INTEGER NOT NULL,

    CONSTRAINT "DisciplineInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "id_subject" INTEGER NOT NULL,
    "totalMark" INTEGER DEFAULT 0,
    "studentMark" INTEGER DEFAULT 0,
    "tryings" INTEGER DEFAULT 7,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" "TypeOfQuestion" NOT NULL,
    "id_task" INTEGER NOT NULL,
    "questionMark" INTEGER,
    "answerMark" INTEGER,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextAnswer" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "mark" INTEGER NOT NULL,
    "userAnswer" TEXT,
    "id_task" INTEGER,
    "id_question" INTEGER NOT NULL,

    CONSTRAINT "TextAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Victorina" (
    "id" SERIAL NOT NULL,
    "id_question" INTEGER NOT NULL,
    "id_task" INTEGER,

    CONSTRAINT "Victorina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "mark" INTEGER NOT NULL,
    "id_task" INTEGER,
    "id_victorina" INTEGER NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAnswer" (
    "id" SERIAL NOT NULL,
    "id_student" INTEGER NOT NULL,
    "id_task" INTEGER,
    "id_textAnswer" INTEGER,
    "id_optionAnswer" INTEGER,
    "markForOption" INTEGER,
    "userOptionAnswer" BOOLEAN,
    "userTextAnswer" TEXT,
    "isCorrect" BOOLEAN,

    CONSTRAINT "UserAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TextAnswer_id_question_key" ON "TextAnswer"("id_question");

-- CreateIndex
CREATE UNIQUE INDEX "Victorina_id_question_key" ON "Victorina"("id_question");

-- CreateIndex
CREATE UNIQUE INDEX "Option_id_key" ON "Option"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_avatar_fkey" FOREIGN KEY ("id_avatar") REFERENCES "PublicFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_id_teacher_fkey" FOREIGN KEY ("id_teacher") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisciplineInfo" ADD CONSTRAINT "DisciplineInfo_id_subject_fkey" FOREIGN KEY ("id_subject") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisciplineInfo" ADD CONSTRAINT "DisciplineInfo_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_id_subject_fkey" FOREIGN KEY ("id_subject") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_id_task_fkey" FOREIGN KEY ("id_task") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextAnswer" ADD CONSTRAINT "TextAnswer_id_task_fkey" FOREIGN KEY ("id_task") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextAnswer" ADD CONSTRAINT "TextAnswer_id_question_fkey" FOREIGN KEY ("id_question") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Victorina" ADD CONSTRAINT "Victorina_id_question_fkey" FOREIGN KEY ("id_question") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_id_task_fkey" FOREIGN KEY ("id_task") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_id_victorina_fkey" FOREIGN KEY ("id_victorina") REFERENCES "Victorina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_id_task_fkey" FOREIGN KEY ("id_task") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_id_textAnswer_fkey" FOREIGN KEY ("id_textAnswer") REFERENCES "TextAnswer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_id_optionAnswer_fkey" FOREIGN KEY ("id_optionAnswer") REFERENCES "Option"("id") ON DELETE SET NULL ON UPDATE CASCADE;
