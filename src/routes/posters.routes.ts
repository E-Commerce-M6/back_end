import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares";
import { posterCreateSchema, posterUpdateSchema } from "../schemas/posters.schemas";
import { updatePosterController } from "../controllers/posters";
import { createPosterController } from "../controllers/posters";

const posterRoutes: Router = Router();

posterRoutes.post("", ensureDataIsValidMiddleware(posterCreateSchema), createPosterController);
posterRoutes.patch("/:id", ensureDataIsValidMiddleware(posterUpdateSchema), updatePosterController);

export default posterRoutes;
