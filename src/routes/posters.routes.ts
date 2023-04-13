import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares";
import { posterCreateSchema, posterUpdateSchema } from "../schemas/posters.schemas";
import { createPosterController, updatePosterController, deletePosterController } from "../controllers/posters";

const posterRoutes: Router = Router();

posterRoutes.post("", ensureDataIsValidMiddleware(posterCreateSchema), createPosterController);
posterRoutes.patch("/:id", ensureDataIsValidMiddleware(posterUpdateSchema), updatePosterController);
posterRoutes.delete("/:id", deletePosterController);

export default posterRoutes;
