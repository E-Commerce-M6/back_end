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
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsSellerMiddleware from "../middlewares/ensureIsSeller.middleware";

const posterRoutes: Router = Router();

posterRoutes.post("", 
  ensureAuthMiddleware,
  ensureIsSellerMiddleware,
  ensureDataIsValidMiddleware(posterCreateSchema), 
  createPosterController);

posterRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureIsSellerMiddleware,
  ensurePosterExistsMiddleware,
  ensureDataIsValidMiddleware(posterUpdateSchema),
  updatePosterController
);

posterRoutes.delete("/:id", 
  ensureIsSellerMiddleware,
  ensureAuthMiddleware,  
  ensurePosterExistsMiddleware, 
  deletePosterController
);

posterRoutes.get("", ensureAuthMiddleware, listPosterController);
posterRoutes.get("/:id", ensureAuthMiddleware, ensurePosterExistsMiddleware, getPosterByIdController);

export default posterRoutes;
