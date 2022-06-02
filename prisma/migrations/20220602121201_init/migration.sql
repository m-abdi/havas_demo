-- CreateEnum
CREATE TYPE "LicenseType" AS ENUM ('ENTER', 'EXIT');

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "placeId" TEXT,
    "title" VARCHAR(255),
    "responsibility" VARCHAR(255),
    "state" VARCHAR(255),
    "city" VARCHAR(255),
    "postalCode" VARCHAR(255),
    "address" VARCHAR(255),
    "telephone" VARCHAR(255),
    "phoneNumber" VARCHAR(255),
    "roleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "subPlaceId" TEXT,
    "typeOfWork" TEXT,
    "state" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "address" TEXT,
    "telephone" TEXT,
    "phoneNumber" TEXT,
    "website" TEXT,
    "nationalId" TEXT,
    "economicCode" TEXT,
    "registeredNumber" TEXT,
    "description" TEXT,
    "createdAt" TEXT,
    "editedAt" TEXT,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "technicalSpecification" VARCHAR(1000) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "numberOfAssets" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "License" (
    "id" TEXT NOT NULL,
    "fromPersonId" TEXT NOT NULL,
    "toPersonId" TEXT NOT NULL,
    "fromPlaceId" TEXT NOT NULL,
    "toPlaceId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "numbers" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3) NOT NULL,
    "confirmedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "License_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "createPerson" BOOLEAN NOT NULL,
    "editPerson" BOOLEAN NOT NULL,
    "deletePerson" BOOLEAN NOT NULL,
    "createPlace" BOOLEAN NOT NULL,
    "editPlace" BOOLEAN NOT NULL,
    "deletePlace" BOOLEAN NOT NULL,
    "createEquipment" BOOLEAN NOT NULL,
    "editEquipment" BOOLEAN NOT NULL,
    "deleteEquipment" BOOLEAN NOT NULL,
    "createAsset" BOOLEAN NOT NULL,
    "editAsset" BOOLEAN NOT NULL,
    "deleteAsset" BOOLEAN NOT NULL,
    "createLicense" BOOLEAN NOT NULL,
    "editLicense" BOOLEAN NOT NULL,
    "deleteLicense" BOOLEAN NOT NULL,
    "createTag" BOOLEAN NOT NULL,
    "editTag" BOOLEAN NOT NULL,
    "deleteTag" BOOLEAN NOT NULL,
    "createRole" BOOLEAN NOT NULL,
    "editRole" BOOLEAN NOT NULL,
    "deleteRole" BOOLEAN NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_placeId_key" ON "Person"("placeId");

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Place_subPlaceId_key" ON "Place"("subPlaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_assetId_key" ON "Tag"("assetId");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_subPlaceId_fkey" FOREIGN KEY ("subPlaceId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_fromPersonId_fkey" FOREIGN KEY ("fromPersonId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_toPersonId_fkey" FOREIGN KEY ("toPersonId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_fromPlaceId_fkey" FOREIGN KEY ("fromPlaceId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_toPlaceId_fkey" FOREIGN KEY ("toPlaceId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
