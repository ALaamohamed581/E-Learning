/*
  Warnings:

  - You are about to drop the column `receiver` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `sender` on the `Message` table. All the data in the column will be lost.
  - Added the required column `receiverid` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderid` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "receiver",
DROP COLUMN "sender",
ADD COLUMN     "receiverid" INTEGER NOT NULL,
ADD COLUMN     "senderid" INTEGER NOT NULL;
