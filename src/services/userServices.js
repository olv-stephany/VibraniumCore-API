import prisma from '../prisma.js' //importando o prisma client

export const createUser = async (info) => {
    return await prisma.usuario.create({ data: info });
};

export const listUser = async () => {
    return await prisma.usuario.findMany();
};

export const searchUserById = async (id) => {
    return await prisma.usuario.findUnique({ where: { id: Number(id) } });
};

export const updateUser = async (id, info) => {
    return await prisma.usuario.update({
        where: { id: Number(id) },
        data: info,
    });
};

export const deleteUser = async (id) => {
    return await prisma.usuario.delete({ where: { id: Number(id) } });
};
