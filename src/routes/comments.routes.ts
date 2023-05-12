import { Router } from "express";
import {
  ensureAuthMiddleware,
  ensureCommentExistsMiddleware,
  ensureCommentOwnerMiddleware,
  ensureDataIsValidMiddleware,
  ensureIsIdValidMiddleware,
  ensurePosterExistsMiddleware,
} from "../middlewares";
import { createCommentSchema, updateCommentSchema } from "../schemas/comments.schemas";
import {
  createCommentController,
  deleteCommentController,
  getCommentsByPostIdController,
  updateCommentController,
} from "../controllers/comments";

const commentRoutes: Router = Router();

commentRoutes.post(
  "/posters/:id/comments",
  ensureAuthMiddleware,
  ensureIsIdValidMiddleware,
  ensurePosterExistsMiddleware,
  ensureDataIsValidMiddleware(createCommentSchema),
  createCommentController
);

commentRoutes.patch(
  "/comments/:id",
  ensureAuthMiddleware,
  ensureIsIdValidMiddleware,
  ensureCommentExistsMiddleware,
  ensureCommentOwnerMiddleware,
  ensureDataIsValidMiddleware(updateCommentSchema),
  updateCommentController
);

commentRoutes.get(
  "/posters/:id/comments",
  ensureIsIdValidMiddleware,
  ensurePosterExistsMiddleware,
  getCommentsByPostIdController
);

commentRoutes.delete(
  "/comments/:id",
  ensureAuthMiddleware,
  ensureIsIdValidMiddleware,
  ensureCommentExistsMiddleware,
  ensureCommentOwnerMiddleware,
  deleteCommentController
);

export default commentRoutes;
