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

posterRoutes.get("", ensureAuthMiddleware, listPosterController);
posterRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  ensurePosterExistsMiddleware,
  getPosterByIdController
);

export default posterRoutes;
