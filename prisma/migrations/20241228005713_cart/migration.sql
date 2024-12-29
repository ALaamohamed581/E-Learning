/*
  Warnings:

  - A unique constraint covering the columns `[CartIt]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `CartIt` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "CartIt" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CartItemToCourse" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CartItemToCourse_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_studentId_key" ON "Cart"("studentId");

-- CreateIndex
CREATE INDEX "Cart_id_idx" ON "Cart"("id");

-- CreateIndex
CREATE INDEX "CartItem_id_idx" ON "CartItem"("id");

-- CreateIndex
CREATE INDEX "_CartItemToCourse_B_index" ON "_CartItemToCourse"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Order_CartIt_key" ON "Order"("CartIt");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartItemToCourse" ADD CONSTRAINT "_CartItemToCourse_A_fkey" FOREIGN KEY ("A") REFERENCES "CartItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartItemToCourse" ADD CONSTRAINT "_CartItemToCourse_B_fkey" FOREIGN KEY ("B") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
