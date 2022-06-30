/*
  Warnings:

  - You are about to drop the column `economicCode` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Place` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Place` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Place" DROP COLUMN "economicCode",
DROP COLUMN "phoneNumber",
ADD COLUMN     "economicalCode" TEXT,
ADD COLUMN     "mobileNumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Place_name_key" ON "Place"("name");
