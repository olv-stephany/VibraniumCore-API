import prisma from '../prisma.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { nome_usuario, email, senha } = req.body;

    try {
        const userExists = await prisma.usuario.findUnique({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: 'Email já está em uso.' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const newUser = await prisma.usuario.create({
            data: {
                nome_usuario,
                email,
                senha: hashedPassword
            }
        });

        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: `Erro ao registrar: ${error.message}` });
    }
};


export const login = async (req, res) =>{
    const {email , senha} = req.body

    try{
        const user = await prisma.usuario.findUnique({where:{email}}); 

        if(!user || !await bcrypt.compare(senha, user.senha)){
            return res.status(401).json({error: 'Email ou senha incorretos'})
        }

        const token = jwt.sign(
            {id: user.id, nome: user.nome_usuario, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );

        res.json({token})
    } catch (error) {
        console.error('Erro detalhado:', error)
        res.status(500).json({error: 'Error ao realizar login.'})
    }
}