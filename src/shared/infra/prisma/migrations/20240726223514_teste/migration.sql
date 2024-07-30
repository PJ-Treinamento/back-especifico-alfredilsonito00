/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Piu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userid]` on the table `Piu` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Piu_id_key" ON "Piu"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Piu_userid_key" ON "Piu"("userid");
