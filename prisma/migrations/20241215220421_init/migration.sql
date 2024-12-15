/*
  Warnings:

  - Added the required column `teacherId` to the `Certifacet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Certifacet" ADD COLUMN     "teacherId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Certifacet" ADD CONSTRAINT "Certifacet_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
