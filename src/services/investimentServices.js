//integrado a API da BRAPI
import prisma from '../prisma.js' //importando o prisma client
import { fetchInvestmentData } from '../utils/brapiClient.js';

export const createInvestment = async (code, extras) => {

  const data = await fetchInvestmentData(code);

  return await prisma.investimento.create({
    data: {
      nome_investimento: data.nome_investimento,
      valor_unitario: data.preco_atual,
      indice_rentabilidade: data.rentabilidade,

      code: extras.code,
      categoria_investimentos_id: extras.categoriaId,
      riscos_investimentos_id: extras.riscoId,
      liquidez: extras.liquidez,
      descricao: extras.descricao ?? null
    }
  });
};

export const listInvestment = async () => {
  return await prisma.investimento.findMany({
    include: {
      categoria: true,
      risco: true
    }
  });
};

export const searchInvestmentById = async (id) => {
  return await prisma.investimento.findUnique({
    where: { id: Number(id) },
    include: {
      categoria: true,
      risco: true
    }
  });
};

export const updateInvestment = async (id, info) => {
  return await prisma.investimento.update({
    where: { id: Number(id) },
    data: {
      code: info.code,
      liquidez: info.liquidez,
      descricao: info.descricao ?? null,
      categoria: {
        connect: { id: Number(info.categoria) },
      },
      risco: {
        connect: { id: Number(info.risco) },
      }
    }
  });
};

export const deleteInvestment = async (id) => {
  return await prisma.investimento.delete({
    where: { id: Number(id) }
  });
};