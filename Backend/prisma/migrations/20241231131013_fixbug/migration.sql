/*
  Warnings:

  - You are about to drop the column `age` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "age",
DROP COLUMN "contact",
DROP COLUMN "gender",
DROP COLUMN "name";
