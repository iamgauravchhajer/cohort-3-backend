import { Router } from "express";
import { registerUserController } from "../controllers/auth.controller.js";
import { registerUserValidator } from "../validations/auth.validator.js";

const authRouter = Router();

authRouter.post('/register',registerUserValidator, registerUserController)

export default authRouter