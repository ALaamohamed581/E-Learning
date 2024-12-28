/*
  Warnings:

  - You are about to drop the `_CartItemToCourse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CartItemToCourse" DROP CONSTRAINT "_CartItemToCourse_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartItemToCourse" DROP CONSTRAINT "_CartItemToCourse_B_fkey";

-- DropTable
DROP TABLE "_CartItemToCourse";

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cousreId_fkey" FOREIGN KEY ("cousreId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
