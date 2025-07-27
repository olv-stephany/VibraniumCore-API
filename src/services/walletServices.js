import prisma from "../prisma.js"
import { fetchInvestmentData } from '../utils/brapiClient.js';
import { fetchMultipleInvestmentData } from '../utils/brapiClientMultiple.js';

export const createOrUpdateWallet = async (usuarioId, code, quantidade) => {

    const data = await fetchInvestmentData(code);
    const investiment = await prisma.investimento.findFirst({
        where: { nome_investimento: data.nome_investimento }
    });
    if (!investiment) {
        throw new Error("Investimento não encontrado no banco de dados");
    } //consulta no banco de dados


    const carteiraExistente = await prisma.carteira.findUnique({
        where: {
            usuario_id_investimento_id: {
                usuario_id: usuarioId,
                investimento_id: investiment.id
            }
        }
    });

    const novoValorTotal = quantidade * data.preco_atual;

    if (carteiraExistente) { //se houver uma carteira já existente, apenas atualiza esta (update)
        const novaQuantidade = carteiraExistente.quantidade_total + quantidade;
        const newValue = carteiraExistente.valor_total + novoValorTotal;

        return await prisma.carteira.update({
            where: {
                usuario_id_investimento_id: {
                    usuario_id: usuarioId,
                    investimento_id: investiment.id
                }
            },
            data: {
                quantidade_total: novaQuantidade,
                valor_total: newValue
            }
        });

    } else {
        //se não houver, cria-se um novo registro (create)
        return await prisma.carteira.create({
            data: {
                usuario_id: usuarioId,
                investimento_id: investiment.id,
                quantidade_total: quantidade,
                valor_total: novoValorTotal
            }
        });
    }
};



//para situaçoes de venda de ativos (update), ativo removido da carteiro se zerado
export const updateOrRemoveActive = async (usuarioId, code, quantidadeVendida) => {
    const data = await fetchInvestmentData(code);

    const investiment = await prisma.investimento.findFirst({
        where: { nome_investimento: data.nome_investimento }
    });
    if (!investiment) {
        throw new Error("Investimento não encontrado no banco de dados");
    }

    const wallet = await prisma.carteira.findUnique({
        where: {
            usuario_id_investimento_id: {
                usuario_id: usuarioId,
                investimento_id: investiment.id
            }
        }
    });
    if (!wallet) {
        throw new Error("Ativo não encontrado na carteira");
    }

    if (wallet.quantidade_total < quantidadeVendida) {
        throw new Error("Quantidade vendida maior que o disponível na carteira");
    }


    const novaQuantidade = wallet.quantidade_total - quantidadeVendida;
    const valorReduzido = quantidadeVendida * data.preco_atual;
    const novoValor = wallet.valor_total - valorReduzido;


    if (novaQuantidade === 0) {
        //remove o ativo da carteira
        return await prisma.carteira.delete({
            where: {
                usuario_id_investimento_id: {
                    usuario_id: usuarioId,
                    investimento_id: investiment.id
                }
            }
        });

    } else {
        return await prisma.carteira.update({
            where: {
                usuario_id_investimento_id: {
                    usuario_id: usuarioId,
                    investimento_id: investiment.id
                }
            },
            data: {
                quantidade_total: novaQuantidade,
                valor_total: novoValor
            }
        });
    }
};



//lista da carteira, true se for para buscar dados na brapi
export const listNewWallet = async (usuario_id, atualizar = false) => {
    const wallet = await prisma.carteira.findMany({
        where: { usuario_id },
        include: {
            investimento: true
        }
    });

    if (!wallet.length) return [];

    if (!atualizar) {
        return wallet.map(item => ({
            code: item.investimento.code,
            nome: item.investimento.nome,
            quantidade: item.quantidade_total,
            precoAtual: item.preco_unitario_momento ?? 0,
            valorTotalAtual: item.preco_unitario_momento
                ? item.preco_unitario_momento * item.quantidade_total
                : 0,
            rentabilidade: null,
            ultimaAtualizacao: item.ultima_atualizacao
        }));
    }

    const codes = wallet.map(item => item.investimento.code);
    const dadosAtuais = await fetchMultipleInvestmentData(codes);

    // Junta os dados da carteira com os dados da brapi
    const updateWallet = wallet.map(item => {
        const infoAtual = dadosAtuais.find(d => d.code === item.investimento.code);

        return {
            code: item.investimento.code,
            nome: infoAtual?.nome_investimento || item.investimento.code,
            quantidade: item.quantidade_total,
            precoAtual: infoAtual?.preco_atual ?? 0,
            valorTotalAtual: infoAtual?.preco_atual ? infoAtual.preco_atual * item.quantidade_total : 0,
            rentabilidade: infoAtual?.rentabilidade ?? 0,
            ultimaAtualizacao: item.ultima_atualizacao
        };
    });

    return updateWallet;
};

