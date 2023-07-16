-- AlterTable
ALTER TABLE "Option" ALTER COLUMN "userAnswer" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TextAnswer" ALTER COLUMN "userAnswer" DROP NOT NULL;
