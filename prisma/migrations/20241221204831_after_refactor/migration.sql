/*
  Warnings:

  - You are about to drop the `AdminPermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseStudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentPermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherPermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherStudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdminPermission" DROP CONSTRAINT "AdminPermission_adminId_fkey";

-- DropForeignKey
ALTER TABLE "AdminPermission" DROP CONSTRAINT "AdminPermission_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "CourseOrder" DROP CONSTRAINT "CourseOrder_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseOrder" DROP CONSTRAINT "CourseOrder_orderId_fkey";

-- DropForeignKey
ALTER TABLE "CourseStudent" DROP CONSTRAINT "CourseStudent_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseStudent" DROP CONSTRAINT "CourseStudent_studentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentPermission" DROP CONSTRAINT "StudentPermission_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "StudentPermission" DROP CONSTRAINT "StudentPermission_studentId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherPermission" DROP CONSTRAINT "TeacherPermission_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherPermission" DROP CONSTRAINT "TeacherPermission_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherStudent" DROP CONSTRAINT "TeacherStudent_studentId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherStudent" DROP CONSTRAINT "TeacherStudent_teacherId_fkey";

-- DropTable
DROP TABLE "AdminPermission";

-- DropTable
DROP TABLE "CourseOrder";

-- DropTable
DROP TABLE "CourseStudent";

-- DropTable
DROP TABLE "StudentPermission";

-- DropTable
DROP TABLE "TeacherPermission";

-- DropTable
DROP TABLE "TeacherStudent";

-- CreateTable
CREATE TABLE "_StudentToTeacher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_StudentToTeacher_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CourseToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CourseToStudent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CourseToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CourseToOrder_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PermissionToTeacher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PermissionToTeacher_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PermissionToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PermissionToStudent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AdminToPermission" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AdminToPermission_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_StudentToTeacher_B_index" ON "_StudentToTeacher"("B");

-- CreateIndex
CREATE INDEX "_CourseToStudent_B_index" ON "_CourseToStudent"("B");

-- CreateIndex
CREATE INDEX "_CourseToOrder_B_index" ON "_CourseToOrder"("B");

-- CreateIndex
CREATE INDEX "_PermissionToTeacher_B_index" ON "_PermissionToTeacher"("B");

-- CreateIndex
CREATE INDEX "_PermissionToStudent_B_index" ON "_PermissionToStudent"("B");

-- CreateIndex
CREATE INDEX "_AdminToPermission_B_index" ON "_AdminToPermission"("B");

-- AddForeignKey
ALTER TABLE "_StudentToTeacher" ADD CONSTRAINT "_StudentToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToTeacher" ADD CONSTRAINT "_StudentToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToStudent" ADD CONSTRAINT "_CourseToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToStudent" ADD CONSTRAINT "_CourseToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToOrder" ADD CONSTRAINT "_CourseToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToOrder" ADD CONSTRAINT "_CourseToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToTeacher" ADD CONSTRAINT "_PermissionToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToTeacher" ADD CONSTRAINT "_PermissionToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToStudent" ADD CONSTRAINT "_PermissionToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToStudent" ADD CONSTRAINT "_PermissionToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminToPermission" ADD CONSTRAINT "_AdminToPermission_A_fkey" FOREIGN KEY ("A") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminToPermission" ADD CONSTRAINT "_AdminToPermission_B_fkey" FOREIGN KEY ("B") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
