-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_tipo_investidor_id_fkey";

-- DropIndex
DROP INDEX "usuario_cpf_key";

-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "cpf" DROP NOT NULL,
ALTER COLUMN "tipo_investidor_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_tipo_investidor_id_fkey" FOREIGN KEY ("tipo_investidor_id") REFERENCES "tipo_investidor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
