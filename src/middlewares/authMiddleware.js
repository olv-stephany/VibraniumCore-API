import jwt from "jsonwebtoken"

export const authToken = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).json({error: 'Token não fornecido.'});

    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) =>{
        if(err) return res.status(403).json({error: 'Token inválido.'});

        req.usuario = usuario;
        next();
    });
};