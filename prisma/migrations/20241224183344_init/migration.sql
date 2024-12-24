/*
  Warnings:

  - The `role` column on the `Admin` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('STUDENT', 'TEACHER', 'ADMIN', 'SUPER_ADMIN');

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "role",
ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'ADMIN';

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'STUDENT';

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'TEACHER';

-- AddForeignKey
ALTER TABLE "VideWtached" ADD CONSTRAINT "VideWtached_VideoId_fkey" FOREIGN KEY ("VideoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
