/*
  Warnings:

  - A unique constraint covering the columns `[courseId]` on the table `Certifacet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "CourseID" INTEGER NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Certifacet_courseId_key" ON "Certifacet"("courseId");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_CourseID_fkey" FOREIGN KEY ("CourseID") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
