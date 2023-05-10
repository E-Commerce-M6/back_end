import { Router } from "express";
import {
  ensureDataIsValidMiddleware,
  ensurePosterExistsMiddleware,
  ensureAuthMiddleware,
  ensureIsSellerMiddleware,
  ensurePostOwnerMiddleware,
  ensureIsIdValidMiddleware,
  treatDataMiddleware,
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
import upload from "../configs/multer.config";
import bodyParser from "body-parser";

const posterRoutes: Router = Router();

posterRoutes.use(bodyParser.json())

posterRoutes.post(
  "",
  upload.array("image"),
  treatDataMiddleware,
  ensureAuthMiddleware,
  ensureIsSellerMiddleware,
  ensureDataIsValidMiddleware(posterCreateSchema),
  createPosterController
);

posterRoutes.patch(
  "/:id",
  upload.array("image"),
  treatDataMiddleware,
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
