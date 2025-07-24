import * as investimentService from '../services/investimentServices.js'

//criação de novo investimento com dados da BRAPI + extras
export const create = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const { code, ...extras } = req.body;
        const investment = await investimentService.createInvestment(usuarioId, code, extras);

        return res.status(201).json(investment)
    } catch (error) {
        return res.status(500).json({ error: `Erro ao criar investimento: ${error.message}` });
    }
};

export const list = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const investments = await investimentService.listInvestment(usuarioId);

        res.json(investments);
    } catch (error) {
        res.status(500).json({ error: `Erro ao listar investimentos: ${error.message}` });
    }
};

export const searchById = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const investment = await investimentService.searchInvestmentById(usuarioId, req.params.id);

        res.json(investment)
    } catch (error) {
        res.status(500).json({ error: `Erro ao buscar investimentos: ${error.message}` });
    }
}

export const update = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const investiment = await investimentService.updateInvestment(usuarioId, req.params.id, req.body);

        res.json(investiment);
    } catch (error) {
        res.status(500).json({ error: `Erro ao atualizar investimento: ${error.massage}` });
    }
};

export const deleteInvestment = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        await investimentService.deleteInvestment(usuarioId, req.params.id);

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: `Erro ao deletar investimento: ${error.message}` });
    }
};

