/*
  Warnings:

  - You are about to drop the column `issueDate` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `Certificate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `Certificate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `CourseDuration` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseName` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastNmae` to the `Certificate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Certificate" DROP CONSTRAINT "Certificate_teacherId_fkey";

-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "issueDate",
DROP COLUMN "name",
DROP COLUMN "teacherId",
ADD COLUMN     "CourseDuration" INTEGER NOT NULL,
ADD COLUMN     "courseName" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastNmae" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "certificatesid" INTEGER,
ALTER COLUMN "duration" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "duration" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_studentId_key" ON "Certificate"("studentId");
