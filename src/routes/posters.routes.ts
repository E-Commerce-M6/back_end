import { Router } from "express";
import { ensureDataIsValidMiddleware, ensurePosterExistsMiddleware } from "../middlewares";
import { posterCreateSchema, posterUpdateSchema } from "../schemas/posters.schemas";
import {
  createPosterController,
  updatePosterController,
  deletePosterController,
  listPosterController,
  getPosterByIdController,
} from "../controllers/posters";

const posterRoutes: Router = Router();

posterRoutes.post("", ensureDataIsValidMiddleware(posterCreateSchema), createPosterController);
posterRoutes.patch(
  "/:id",
  ensurePosterExistsMiddleware,
  ensureDataIsValidMiddleware(posterUpdateSchema),
  updatePosterController
);
posterRoutes.delete("/:id", ensurePosterExistsMiddleware, deletePosterController);
posterRoutes.get("", listPosterController);
posterRoutes.get("/:id", ensurePosterExistsMiddleware, getPosterByIdController);

export default posterRoutes;
