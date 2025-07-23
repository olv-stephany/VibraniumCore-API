//para multiplos codigos da brapi
import axios from 'axios';

export const fetchMultipleInvestmentData = async (codes) => {
    try {
        const joinedCodes = Array.isArray(codes) ? codes.join(',') : codes;

        const response = await axios.get(`https://brapi.dev/api/quote/${joinedCodes}`, {
            headers: {
                Authorization: `Bearer ${process.env.BRAPI_TOKEN}`
            }
        });

        const results = response.data.results;

        if (!results || results.length === 0) {
            throw new Error("Nenhum investimento encontrado na BRAPI");
        }

        const dadosFormatados = results.map(result => ({
            code: result.symbol,
            nome_investimento: result.shortName || result.symbol,
            preco_atual: result.regularMarketPrice,
            rentabilidade: result.regularMarketChangePercent ?? 0.0
        }));

        return dadosFormatados;

    } catch (error) {
        throw new Error("Erro ao buscar dados na BRAPI: " + error.message);
    }
};