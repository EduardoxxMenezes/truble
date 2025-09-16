import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


interface JwtPayloadCustom extends jwt.JwtPayload {
    id: number;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayloadCustom; 
        }
    }
}


if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not defined");
}

const JWT_SECRET = process.env.JWT_SECRET;

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;


    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayloadCustom;
        req.user = decoded;
        next();
    } catch (error) {
        

        res.clearCookie("token", {
            httpOnly: true,                                
            secure: process.env.NODE_ENV === "production",  
            sameSite: "none"                                
        });

        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: 'Token expired' });
            return;
        }
        res.status(401).json({ message: 'Invalid token' });
        return;
    }
}