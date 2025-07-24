import * as movementServices from "../services/movementServices.js"

export const create = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const { code, ...extras } = req.body;

        const movement = await movementServices.createMovement(usuarioId, code, extras);

        return res.status(201).json(movement);
    } catch (error) {
        return res.status(500).json({ error: `Erro ao criar movimentação: ${error.message}` });
    }
};

export const list = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const movement = await movementServices.listMovements(usuarioId);

        res.json(movement);
    } catch (error) {
        res.status(500).json({ error: `Erro ao listar movimentações: ${error.message}` });
    }
};

export const searchById = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const movement = await movementServices.searchMovementById(usuarioId, req.params.id);

        if (!movement) {
            return res.status(404).json({ error: `Movimentação não encontrado` });
        } else {
            res.json(movement)
        }
    } catch (error) {
        res.status(500).json({ error: `Erro ao buscar movimentação: ${error.message}` });
    }
}

export const update = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const movement = await movementServices.updateMovementById(usuarioId, req.params.id, req.body.status);

        res.json(movement);
    } catch (error) {
        res.status(500).json({ error: `Erro ao atualizar status da movimentação: ${error.message}` });
    }
};