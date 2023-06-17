import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

const secret = "chave-jwt";

export const jwtService = {
    signToken: (user: User) => {
        const payload = {
            id: user.id,
            username: user.username,
        }

        return jwt.sign(payload, secret, { expiresIn: "1d" });
    },

    verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
        jwt.verify(token, secret, callbackfn);
    }
}