/*
  Warnings:

  - Added the required column `watched` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "order" SERIAL NOT NULL,
ADD COLUMN     "watched" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "VideWtached" (
    "studentId" INTEGER NOT NULL,
    "VideoId" INTEGER NOT NULL,
    "wtached" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "VideWtached_pkey" PRIMARY KEY ("studentId","VideoId")
);
