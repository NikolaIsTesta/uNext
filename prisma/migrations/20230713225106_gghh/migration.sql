-- AlterTable
CREATE SEQUENCE publicfile_id_seq;
ALTER TABLE "PublicFile" ALTER COLUMN "id" SET DEFAULT nextval('publicfile_id_seq');
ALTER SEQUENCE publicfile_id_seq OWNED BY "PublicFile"."id";
