/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Piu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Users_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Piu_id_key" ON "Piu"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");
