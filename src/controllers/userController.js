import * as userServices from "../services/userServices.js" //este asterisco indica que importa tudo da service de usuarios

export const create = async (req, res) => {
    try {
        const user = await userServices.createUser(req.body);
        res.status(201).json(user);
    }
    catch (erro) {
        res.status(500).json({ erro: `Erro ao criar o usuário...${erro.message}` });
    }
};

export const list = async (req, res) => {
    const user = await userServices.listUser();
    res.json(user);
};

export const searchById = async (req, res) => {
    const user = await userServices.searchUserById(req.params.id);

    if (!user) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }
    else {
        res.json(user);
    }
};

export const update = async (req, res) => {
    try{
        const user = await userServices.updateUser(req.params.id, req.body);
        res.json(user)
    }
    catch (erro){
        res.status(500).json({erro: `Erro ao atualizar usuário...${erro.message}`});
    }
};

export const deleteUser = async (req, res) => {
    await userServices.deleteUser(req.params.id);
    res.status(204).end();
};



