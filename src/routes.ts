import express from "express";
import { ensureAuth } from "./middlewares/auth";
import { authController } from "./controllers/authController";
import { brewerieController } from "./controllers/brewerieController";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/breweries", ensureAuth, brewerieController.searchBrewerie);

export {
    router
}