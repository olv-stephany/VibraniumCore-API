import prisma from "../prisma.js"
import { fetchInvestmentData } from '../utils/brapiClient.js';

export const createMovement = async (code, extras) => {
    //extras = dados do schema
    //code = dados da api
    
    const data = await fetchInvestmentData(code); //BRAPI

    const investimento = await prisma.investimento.findFirst({
        where: {
            nome_investimento: data.nome_investimento
        }
    });

    if (!investimento) {
        throw new Error('Investimento não encontrado no banco de dados');
    }

    const valorTotal = extras.quantidade * data.preco_atual;
    //calcula o custo total pela quantidade selecionada

    return await prisma.movimentacao.create({
        data: {
            usuario_id: extras.usuarioId,
            investimento_id: investimento.id,
            tipo_transacao: extras.tipoTransacao,
            quantidade: extras.quantidade,
            valor_unitario_momento: data.preco_atual,
            valor_total: valorTotal,
            data_transacao: new Date(),
            status: extras.status
        },

        //para exibição do nome de usuario e de investimentos na requisição
        include: {
            usuario: {
                select: {
                    nome_usuario: true,
                    email: true
                }
            },
            investimento: {
                select: {
                    nome_investimento: true
                }
            }
        }
    });
};

export const listMovements = async () => {
    return await prisma.movimentacao.findMany({
        include: {
            usuario: {
                select: {
                    nome_usuario: true,
                    email: true
                }
            },
            investimento: {
                select: {
                    nome_investimento: true

                }
            }
        }
    });
};

export const searchMovementById = async (id) => {
    return await prisma.movimentacao.findUnique({
        where: { id: Number(id) },
        include: {
            usuario: {
                select: {
                    nome_usuario: true,
                    email: true
                }
            },
            investimento: {
                select: {
                    nome_investimento: true

                }
            }
        }
    });
};

//update de status da movimentação (Pendente, Concluida ou cancelada). não haverá delete das movimentaçoes
export const updateMovementById = async (id, NewStatus) => {
    const movimentacao = await prisma.movimentacao.findUnique({
        where: { id: Number(id) }
    })

    if (!movimentacao){
        throw new Error('Movimentação indisponivel ou não encontrada.');
    }

    return await prisma.movimentacao.update({
        where:{id: Number(id)},
        data:{status: NewStatus}
    });
};