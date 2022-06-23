/*
  Warnings:

  - You are about to drop the column `email` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `responsibility` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Person` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Person_email_key";

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "phoneNumber",
DROP COLUMN "responsibility",
DROP COLUMN "title",
ADD COLUMN     "firstNameAndLastName" VARCHAR(255),
ADD COLUMN     "mobileNumber" VARCHAR(255),
ADD COLUMN     "website" VARCHAR(255);
