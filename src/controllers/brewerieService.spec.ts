import request from "supertest"
import { app } from "../server"

describe("List breweries", () => {
    it("should be able to list breweries", async() => {
        const response = await request(app).get("/breweries").query({
            query: "dog"
        }).set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZDBmYWFlLTRlOGEtNDQzOS1hZjA2LTJlMWVjM2NiOTRiYiIsInVzZXJuYW1lIjoiTHVjYXMiLCJpYXQiOjE2ODcwMTU5NjMsImV4cCI6MTY4NzEwMjM2M30.PI4FhC2RdJHmBPZRBhddI-QzX_Y5Fvz3iBkAqiKinSA")
        
        expect(response.statusCode).toBe(200);
        console.log(response.body);
    });
})