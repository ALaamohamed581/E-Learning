/*
  Warnings:

  - The primary key for the `VideWtached` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `courseId` to the `VideWtached` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VideWtached" DROP CONSTRAINT "VideWtached_pkey",
ADD COLUMN     "courseId" INTEGER NOT NULL,
ADD CONSTRAINT "VideWtached_pkey" PRIMARY KEY ("studentId", "VideoId", "courseId");
