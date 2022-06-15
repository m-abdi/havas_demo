/*
  Warnings:

  - You are about to drop the column `subPlaceId` on the `Place` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_subPlaceId_fkey";

-- DropIndex
DROP INDEX "Place_subPlaceId_key";

-- AlterTable
ALTER TABLE "Place" DROP COLUMN "subPlaceId",
ADD COLUMN     "superPlaceId" TEXT;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_superPlaceId_fkey" FOREIGN KEY ("superPlaceId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;
