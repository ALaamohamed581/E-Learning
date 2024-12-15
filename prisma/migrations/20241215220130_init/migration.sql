-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CorseStudent" (
    "stdId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "CorseStudent_pkey" PRIMARY KEY ("stdId","courseId")
);

-- CreateTable
CREATE TABLE "Certifacet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "stdId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Certifacet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CorseStudent" ADD CONSTRAINT "CorseStudent_stdId_fkey" FOREIGN KEY ("stdId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorseStudent" ADD CONSTRAINT "CorseStudent_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certifacet" ADD CONSTRAINT "Certifacet_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certifacet" ADD CONSTRAINT "Certifacet_stdId_fkey" FOREIGN KEY ("stdId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
