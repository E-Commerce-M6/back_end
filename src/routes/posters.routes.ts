import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares";
import { posterCreateSchema } from "../schemas/posters.schemas";
import { createPosterController } from "../controllers/posters";

const posterRoutes: Router = Router();

posterRoutes.post("", ensureDataIsValidMiddleware(posterCreateSchema), createPosterController);

export default posterRoutes;
