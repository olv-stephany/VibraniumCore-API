import * as investimentService from '../services/investimentServices.js'

//criação de novo investimento com dados da BRAPI + extras
export const create = async (req, res) => {
    try {
        const { code, categoriaId, riscoId, liquidez, descricao } = req.body;

        const investment = await investimentService.createInvestment(code, {
            categoriaId,
            riscoId,
            liquidez,
            descricao
        });

        return res.status(201).json(investment)
    } catch (error) {
        return res.status(500).json({ error: `Erro ao criar investimento: ${error.message}` });
    }
};

export const list = async (req, res) => {
    try {
        const investments = await investimentService.listInvestment();
        res.json(investments);
    } catch (error) {
        res.status(500).json({ error: `Erro ao listar investimentos: ${error.message}` });
    }
};

export const searchById = async (req, res) => {
    try {
        const investment = await investimentService.searchInvestmentById(req.params.id);

        if (!investment) {
            return res.status(404).json({ error: `Investimento não encontrado` });
        } else {
            res.json(investment)
        }
    } catch (error) {
        res.status(500).json({ error: `Erro ao buscar investimentos: ${error.message}` });
    }
}

export const update = async (req, res) => {
    try {
        const investiment = await investimentService.updateInvestment(req.params.id, req.body);

        res.json(investiment);
    } catch (error) {
        res.status(500).json({ error: `Erro ao atualizar investimento: ${error.massage}` });
    }
};

export const deleteInvestment = async (req, res) => {
    try {
        await investimentService.deleteInvestment(req.params.id);

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: `Erro ao deletar investimento: ${error.massage}` });
    }
};

