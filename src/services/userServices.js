import prisma from '../prisma.js'; //importando o prisma client
import bcrypt from "bcrypt";

export const createUser = async (info) => {
    return await prisma.usuario.create({ data: info });
};

export const listUser = async () => {
    return await prisma.usuario.findMany({
        include: {
            tipo_de_investidor: true
        }
    });
};

export const searchUserById = async (id) => {
    return await prisma.usuario.findUnique({
        where: { id: Number(id) },
        include: {
            tipo_de_investidor: true
        }
    });
};

export const updateUser = async (id, info) => {
    const {senha, ...resto} = info;

    const data = {...resto}
    if(senha){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);
        data.senha = hashedPassword;
    }
    return await prisma.usuario.update({
        where: { id: Number(id) },
        data,
    });//a senha será recriptografada caso seja atualizada, se não for, continuará a mesma
};

export const deleteUser = async (id) => {
    return await prisma.usuario.delete({
        where: { id: Number(id) }
    });
};
