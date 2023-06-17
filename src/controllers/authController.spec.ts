import request from "supertest"
import { app } from "../server"

describe("Create user", () => {
    it("should be able to create user", async() => {
        const response = await request(app).post("/register").send({
            username: "New user 5",
            password: "password"
        });

        expect(response.statusCode).toBe(201);
        console.log(response.body);
    })
})

describe("Login user", () => {
    it("should be able to login user", async() => {
        const response = await request(app).post("/login").send({
            username: "Lucas",
            password: "123456"
        });

        expect(response.statusCode).toBe(200);
        console.log(response.body);
    })
})