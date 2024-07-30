/*
  Warnings:

  - You are about to drop the `Piu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Piu" DROP CONSTRAINT "Piu_userid_fkey";

-- DropTable
DROP TABLE "Piu";
