import { Router } from "express";
import { createLoginController } from "../controllers/login";
import { ensureDataIsValidMiddleware } from "../middlewares";
import { loginSchema } from "../schemas/login.schemas";

const loginRoutes: Router = Router();

loginRoutes.post("", ensureDataIsValidMiddleware(loginSchema), createLoginController);

export default loginRoutes;
