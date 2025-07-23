import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    await prisma.tipoInvestidor.createMany({
        data: [
            { nome_tipo: "CAUTELOSO" },
            { nome_tipo: "MODERADO" },
            { nome_tipo: "ARROJADO" }
        ],
        skipDuplicates: true
    });

    await prisma.categoriaInvestimentos.createMany({
        data: [
            { nome_categoria: 'Renda Fixa' },
            { nome_categoria: 'Renda Variável' },
            { nome_categoria: 'Tesouro Direto' },
            { nome_categoria: 'Fundos Imobiliários' },
            { nome_categoria: 'Ações' }
        ],
        skipDuplicates: true
    });

    await prisma.riscosInvestimentos.createMany({
        data: [
            {
                nome_nivel: "BAIXO",
                descricao: "Investimentos de baixo risco são aplicações que oferecem um risco de perda financeira muito pequeno.",
                recomendacao_geral: "Investidores Cautelosos"
            },
            {
                nome_nivel: "MODERADO",
                descricao: "Os investimentos de risco moderado oferecem uma alternativa equilibrada para quem busca rentabilidade superior à da renda fixa tradicional, sem se expor às grandes volatilidades do mercado.",
                recomendacao_geral: "Investidores Moderados"
            },
            {
                nome_nivel: "ALTO",
                descricao: "O investimento de alto risco é aquele que não possui previsibilidade ou até mesmo garantias de rentabilidade. Ou seja, no momento da aplicação, não é possível saber qual será a margem de lucro ou de eventuais perdas.",
                recomendacao_geral: "Investidores Agressivos"
            }
        ],
        skipDuplicates: true
    });

    const updates = [
        { nome_investimento: 'Petrobras', code: 'PETR4' },
        { nome_investimento: 'Vale', code: 'VALE3' },
        { nome_investimento: 'Itaú', code: 'ITUB3' }
    ];

    for (const { nome_investimento, code } of updates) {
        const updated = await prisma.investimento.updateMany({
            where: {
                nome_investimento: {
                    contains: nome_investimento,
                    mode: 'insensitive' //correção de erro na requisição de get em wallet
                }
            }, 
            data: { code }
        });

        //console.log(`Atualizado: ${updated.count} registro(s) para ${nome_investimento} => ${code}`);
    }

    console.log('Seed executado com sucesso.')
}

main()
    .catch((e) => {
        console.error('Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });