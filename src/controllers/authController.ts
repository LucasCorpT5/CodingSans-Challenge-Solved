import { Request, Response } from "express"
import { userService } from "../services/userService";
import bcrypt from "bcrypt"; 
import { jwtService } from "../services/jwtService";

export const authController = {
    register: async(req: Request, res: Response) => {
        const { username, password } = req.body;
        
        try {
            const user = await userService.findByUsername(username);

            if(user) {
                return res.status(404).json({ message: "Esse email já está cadastrado." });
            }

            const createUser = await userService.create(username, password);

            return res.status(201).json(createUser);
        } catch(err) {
            if(err instanceof Error) {
                return res.status(404).json({ message: err.message });
            }
        }
    },

    login: async(req: Request, res: Response) => {
        const { username, password } = req.body;

        try {
            const user = await userService.findByUsername(username);

            if(!user) return res.status(404).json({ message: "O email não foi encontrado!" });

            const verifyPass = await bcrypt.compare(password, user.password);

            if(!verifyPass) return res.status(401).json({ message: "Senha incorreta" });

            const token = jwtService.signToken(user);

            return res.status(200).json({ authenticated: true, user, token });

        } catch(err) {
            if(err instanceof Error) {
                return res.status(404).json({ message: err.message });
            }
        }
    }
}