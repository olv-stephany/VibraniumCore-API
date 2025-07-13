-- CreateEnum
CREATE TYPE "LiquidezEnum" AS ENUM ('BAIXA', 'MEDIA', 'ALTA');

-- CreateEnum
CREATE TYPE "TipoTransacaoEnum" AS ENUM ('COMPRA', 'VENDA');

-- CreateEnum
CREATE TYPE "StatusTransacaoEnum" AS ENUM ('PENDENTE', 'CONCLUIDA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "NomeTipoEnum" AS ENUM ('CAUTELOSO', 'MODERADO', 'ARROJADO');

-- CreateEnum
CREATE TYPE "NomeNivelEnum" AS ENUM ('BAIXO', 'MODERADO', 'ALTO');

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome_usuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "data_de_nascimento" TIMESTAMP(3),
    "tipo_investidor_id" INTEGER NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investimento" (
    "id" SERIAL NOT NULL,
    "nome_investimento" TEXT NOT NULL,
    "liquidez" "LiquidezEnum" NOT NULL,
    "valor_unitario" DECIMAL(65,30) NOT NULL,
    "indice_rentabilidade" DECIMAL(65,30) NOT NULL,
    "descricao" TEXT,
    "categoria_investimentos_id" INTEGER NOT NULL,
    "riscos_investimentos_id" INTEGER NOT NULL,

    CONSTRAINT "investimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movimentacao" (
    "id" SERIAL NOT NULL,
    "tipo_transacao" "TipoTransacaoEnum" NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valor_unitario_momento" DECIMAL(65,30) NOT NULL,
    "valor_total" DECIMAL(65,30) NOT NULL,
    "data_transacao" TIMESTAMP(3) NOT NULL,
    "status" "StatusTransacaoEnum" NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "investimento_id" INTEGER NOT NULL,

    CONSTRAINT "movimentacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_investidor" (
    "id" SERIAL NOT NULL,
    "nome_tipo" "NomeTipoEnum" NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "tipo_investidor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria_investimentos" (
    "id" SERIAL NOT NULL,
    "nome_categoria" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "categoria_investimentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "riscos_investimentos" (
    "id" SERIAL NOT NULL,
    "nome_nivel" "NomeNivelEnum" NOT NULL,
    "descricao" TEXT,
    "recomendacao_geral" TEXT NOT NULL,

    CONSTRAINT "riscos_investimentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carteira" (
    "id" SERIAL NOT NULL,
    "quantidade_total" INTEGER NOT NULL,
    "valor_total" DECIMAL(65,30) NOT NULL,
    "ultima_atualizacao" TIMESTAMP(3) NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "investimento_id" INTEGER NOT NULL,

    CONSTRAINT "carteira_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_cpf_key" ON "usuario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "investimento_nome_investimento_key" ON "investimento"("nome_investimento");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_investimentos_nome_categoria_key" ON "categoria_investimentos"("nome_categoria");

-- CreateIndex
CREATE UNIQUE INDEX "carteira_usuario_id_investimento_id_key" ON "carteira"("usuario_id", "investimento_id");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_tipo_investidor_id_fkey" FOREIGN KEY ("tipo_investidor_id") REFERENCES "tipo_investidor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investimento" ADD CONSTRAINT "investimento_categoria_investimentos_id_fkey" FOREIGN KEY ("categoria_investimentos_id") REFERENCES "categoria_investimentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investimento" ADD CONSTRAINT "investimento_riscos_investimentos_id_fkey" FOREIGN KEY ("riscos_investimentos_id") REFERENCES "riscos_investimentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimentacao" ADD CONSTRAINT "movimentacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimentacao" ADD CONSTRAINT "movimentacao_investimento_id_fkey" FOREIGN KEY ("investimento_id") REFERENCES "investimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carteira" ADD CONSTRAINT "carteira_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carteira" ADD CONSTRAINT "carteira_investimento_id_fkey" FOREIGN KEY ("investimento_id") REFERENCES "investimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
