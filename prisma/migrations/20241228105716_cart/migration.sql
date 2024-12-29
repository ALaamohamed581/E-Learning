/*
  Warnings:

  - Added the required column `cousreId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "cousreId" INTEGER NOT NULL;
