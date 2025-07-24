import * as walletServices from '../services/walletServices.js'

export const addActive = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;

        const { code, quantidade } = req.body;

        if (!code || !quantidade || quantidade <= 0) {
            return res.status(400).json({ error: 'Código e quantidade válidos são obrigatórios.' });
        }

        const updateWallet = await walletServices.createOrUpdateWallet(usuarioId, code, quantidade);
        return res.status(201).json(updateWallet);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const sellActive = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const { code, quantidade } = req.body;

        if (!code || !quantidade || quantidade <= 0) {
            return res.status(400).json({ error: 'Código e quantidade válidos são obrigatórios.' });
        }

        const result = await walletServices.updateOrRemoveActive(usuarioId, code, quantidade);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export const listNewWallet = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const wallet = await walletServices.listNewWallet(usuarioId);
        return res.status(200).json(wallet);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
