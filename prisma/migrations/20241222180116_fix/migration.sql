/*
  Warnings:

  - You are about to drop the column `lastNmae` on the `Certificate` table. All the data in the column will be lost.
  - Added the required column `lastName` to the `Certificate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "lastNmae",
ADD COLUMN     "lastName" TEXT NOT NULL;
