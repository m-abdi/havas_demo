/*
  Warnings:

  - You are about to drop the column `numberOfAssets` on the `Asset` table. All the data in the column will be lost.
  - The primary key for the `Equipment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `technicalSpecification` on the `Equipment` table. All the data in the column will be lost.
  - Added the required column `placeId` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicPropertyCode` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasInstructions` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serialNumber` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `terminologyCode` to the `Equipment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_equipmentId_fkey";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "numberOfAssets",
ADD COLUMN     "placeId" TEXT NOT NULL,
ADD COLUMN     "publicPropertyCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_pkey",
DROP COLUMN "id",
DROP COLUMN "technicalSpecification",
ADD COLUMN     "factory" VARCHAR(300),
ADD COLUMN     "hasInstructions" BOOLEAN NOT NULL,
ADD COLUMN     "installationYear" VARCHAR(300),
ADD COLUMN     "instruction" TEXT,
ADD COLUMN     "model" VARCHAR(3000),
ADD COLUMN     "picture" TEXT,
ADD COLUMN     "productionYear" VARCHAR(300),
ADD COLUMN     "serialNumber" VARCHAR(300) NOT NULL,
ADD COLUMN     "supportCompany" VARCHAR(1000),
ADD COLUMN     "supportMobile" VARCHAR(300),
ADD COLUMN     "supportTelephone" VARCHAR(100),
ADD COLUMN     "terminologyCode" TEXT NOT NULL,
ADD CONSTRAINT "Equipment_pkey" PRIMARY KEY ("terminologyCode");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("terminologyCode") ON DELETE RESTRICT ON UPDATE CASCADE;
