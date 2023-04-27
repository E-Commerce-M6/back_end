import { Router } from "express";
import {
  ensureDataIsValidMiddleware,
  ensurePosterExistsMiddleware,
  ensureAuthMiddleware,
  ensureIsSellerMiddleware,
  ensurePostOwnerMiddleware,
} from "../middlewares";
import { posterCreateSchema, posterUpdateSchema } from "../schemas/posters.schemas";
import {
  createPosterController,
  updatePosterController,
  deletePosterController,
  listPosterController,
  getPosterByIdController,
  getPosterFiltersController,
} from "../controllers/posters";

const posterRoutes: Router = Router();

posterRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureIsSellerMiddleware,
  ensureDataIsValidMiddleware(posterCreateSchema),
  createPosterController
);

posterRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureIsSellerMiddleware,
  ensurePosterExistsMiddleware,
  ensurePostOwnerMiddleware,
  ensureDataIsValidMiddleware(posterUpdateSchema),
  updatePosterController
);

posterRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsSellerMiddleware,
  ensurePosterExistsMiddleware,
  ensurePostOwnerMiddleware,
  deletePosterController
);

posterRoutes.get("", listPosterController);
posterRoutes.get("/filters", getPosterFiltersController);
posterRoutes.get("/:id", ensurePosterExistsMiddleware, getPosterByIdController);

export default posterRoutes;
