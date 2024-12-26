/*
  Warnings:

  - You are about to drop the column `adminId` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_adminId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "adminId";
