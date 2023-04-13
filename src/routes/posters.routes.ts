import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares";
import { posterUpdateSchema } from "../schemas/posters.schemas";
import { updatePosterController } from "../controllers/posters";

const posterRoutes: Router = Router();

posterRoutes.patch("/:id", ensureDataIsValidMiddleware(posterUpdateSchema), updatePosterController);

export default posterRoutes;
