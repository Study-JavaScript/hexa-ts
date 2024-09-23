import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SetEnvError, UnauthorizedError } from '../../../core/domain/errors/main';
import { CustomJwtPayload } from '../../express';
import { userRepository } from './user';

const secretKey = process.env.JWT_SECRET;

export const authenticateJWT = async(req: Request, res: Response, next: NextFunction) => {
    // Mostrar información de la solicitud para depurar
    // console.log("Authorization Header:", req.headers['authorization']);
    // console.log("Request Body Before JWT Auth:", req.body);

    // Obtener el token del encabezado de autorización
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        console.error("No token provided");
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    if (!secretKey) {
        throw new SetEnvError("JWT_SECRET not set in environment variables");
    }

    try {
        // Verificar el token y extraer el payload
        const decoded = jwt.verify(token, secretKey) as CustomJwtPayload;
        // console.log("JWT Verified, user:", user);

        // Almacenar el usuario en la solicitud
        req.user = decoded;
        const user = await userRepository.readById(decoded.id);
        if(!user || user.banned){
            res.status(403).json({ message: 'Forbidden: User is banned' });
            throw new UnauthorizedError("User is banned")
        }

        // Verificar el cuerpo de la solicitud después de la autenticación
        // console.log("Request Body After JWT Auth:", req.body);

        // Pasar al siguiente middleware o controlador
        next();
    } catch (err) {
        console.error("Token verification failed:", err);
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
    next();
};
