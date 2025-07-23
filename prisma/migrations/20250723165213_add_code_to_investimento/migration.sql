/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `investimento` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "investimento" ADD COLUMN     "code" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "investimento_code_key" ON "investimento"("code");
