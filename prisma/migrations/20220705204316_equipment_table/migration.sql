/*
  Warnings:

  - You are about to drop the column `supportCompany` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `supportMobile` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `supportTelephone` on the `Equipment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "supportCompany",
DROP COLUMN "supportMobile",
DROP COLUMN "supportTelephone",
ADD COLUMN     "supportCompanyId" TEXT,
ADD COLUMN     "supportTelephone1" VARCHAR(300),
ADD COLUMN     "supportTelephone2" VARCHAR(100),
ALTER COLUMN "factory" SET DATA TYPE VARCHAR(1000);

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_supportCompanyId_fkey" FOREIGN KEY ("supportCompanyId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;
