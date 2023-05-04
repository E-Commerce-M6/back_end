import { Router } from "express";
import {
  ensureDataIsValidMiddleware,
  ensurePosterExistsMiddleware,
  ensureAuthMiddleware,
  ensureIsSellerMiddleware,
  ensurePostOwnerMiddleware,
  ensureIsIdValidMiddleware,
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
  ensureIsIdValidMiddleware,
  ensurePosterExistsMiddleware,
  ensurePostOwnerMiddleware,
  ensureDataIsValidMiddleware(posterUpdateSchema),
  updatePosterController
);

posterRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsSellerMiddleware,
  ensureIsIdValidMiddleware,
  ensurePosterExistsMiddleware,
  ensurePostOwnerMiddleware,
  deletePosterController
);

posterRoutes.get("", listPosterController);
posterRoutes.get("/filters", getPosterFiltersController);
posterRoutes.get(
  "/:id",
  ensureIsIdValidMiddleware,
  ensurePosterExistsMiddleware,
  getPosterByIdController
);

export default posterRoutes;
