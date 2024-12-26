/*
  Warnings:

  - Added the required column `adminId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "adminId" INTEGER NOT NULL,
ADD COLUMN     "sessionId" TEXT NOT NULL,
ALTER COLUMN "receiverid" SET DATA TYPE TEXT,
ALTER COLUMN "senderid" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
