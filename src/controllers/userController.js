import * as userServices from "../services/userServices.js" //este asterisco indica que importa tudo da service de usuarios

export const create = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;

        const { nome, email, senha } = req.body;

        const existUser = await prisma.usuario.findUnique({
            where: { email }
        });
        if (existUser) return res.status(400).json({ error: 'Email já cadastrado.' }); //verificação de user existente

        //criptografia(senha)
        const hashedPassword = await bcrypt.hash(senha, 10);

        const user = await prisma.usuario.create({
            usuarioId,
            data: {
                nome,
                email,
                senha: hashedPassword
            }
        });

        res.status(201).json({message: 'Usuário criado com sucesso, confira o banco de dados.'});
    }
    catch (erro) {
        res.status(500).json({ erro: `Erro ao criar o usuário...${erro.message}` });
    }
};

export const list = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const user = await userServices.listUser(usuarioId);

        res.status(201).json(user);
    }
    catch (erro) {
        res.status(500).json({ erro: `Erro ao listar usuários...${erro.message}` });
    }
};

export const searchById = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const user = await userServices.searchUserById(usuarioId, req.params.id);

        res.status(201).json(user);
    }
    catch (erro) {
        res.status(404).json({ erro: `Erro, usuário não encontrado...${erro.message}` });
    }
};

export const update = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const user = await userServices.updateUser(usuarioId, req.body);

        res.json(user)
    }
    catch (erro) {
        res.status(500).json({ erro: `Erro ao atualizar usuário...${erro.message}` });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        await userServices.deleteUser(usuarioId, req.params.id);

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: `Erro ao deletar investimento: ${error.message}` });
    }
};



