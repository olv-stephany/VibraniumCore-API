//para a consulta de um unico codigo
import axios from 'axios';

export const fetchInvestmentData = async (code) => {
    try {
        const response = await axios.get(`https://brapi.dev/api/quote/${code}`, {
            headers: {
                Authorization: `Bearer ${process.env.BRAPI_TOKEN}` //token da brapi
            }
        });

        const result = response.data.results[0];

        if (!result) {
            throw new Error("Investimento não encontrado na BRAPI");
        }

        return {
            nome_investimento: result.shortName || result.symbol,
            preco_atual: result.regularMarketPrice,
            rentabilidade: result.regularMarketChangePercent ?? 0.0
        };

    } catch (error) {
        throw new Error("Erro ao buscar dados na BRAPI: " + error.message);
    }
};