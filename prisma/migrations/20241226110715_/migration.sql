/*
  Warnings:

  - You are about to drop the column `receiverid` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `senderid` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "receiverid",
DROP COLUMN "senderid",
ADD COLUMN     "receiverId" TEXT,
ADD COLUMN     "senderId" TEXT,
ADD COLUMN     "sessionId" TEXT;
