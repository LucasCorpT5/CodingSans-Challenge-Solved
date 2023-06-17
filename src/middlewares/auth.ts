import { Request, Response, NextFunction } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";
import { JwtPayload } from "jsonwebtoken";

export function ensureAuth(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;

    if(!authorizationHeader) {
        return res.status(401).json({ message: "Não Autorizado: nenhum token foi encontrado" });
    }

    const token = authorizationHeader.replace(/Bearer /, '');

    jwtService.verifyToken(token, async(err, decoded) => {
        if(err || typeof decoded === "undefined") {
            return res.status(401).json({
                message: "Não autorizado: token inválido"
            })
        }

        const user = await userService.findByUsername((decoded as JwtPayload).username);

        next();
        return user;
    });

}