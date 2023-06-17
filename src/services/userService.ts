import prisma from "../prisma";
import bcrypt from "bcrypt";

export const userService = {
    create: async(username: string, password: string) => {
        const hashedPassword = await bcrypt.hash(password.toString(), 10);
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        });

        return user;
    },
    
    findByUsername: async(username: string) => {
        const user = await prisma.user.findFirst({
            where: {
                username
            }
        });

        return user;
    }
}