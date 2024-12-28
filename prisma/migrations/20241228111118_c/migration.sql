-- DropIndex
DROP INDEX "Cart_studentId_key";

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
