import { Router } from "express";
import {
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware,
  ensureIsIdValidMiddleware,
  ensurePosterExistsMiddleware,
} from "../middlewares";
import { createCommentSchema } from "../schemas/comment.schemas";
import { createCommentController, getCommentsByPostIdController } from "../controllers/comments";

const commentRoutes: Router = Router();

commentRoutes.post(
  "/:id/comments",
  ensureAuthMiddleware,
  ensureIsIdValidMiddleware,
  ensurePosterExistsMiddleware,
  ensureDataIsValidMiddleware(createCommentSchema),
  createCommentController
);

commentRoutes.get(
  "/:id/comments",
  ensureIsIdValidMiddleware,
  ensurePosterExistsMiddleware,
  getCommentsByPostIdController
);

export default commentRoutes;
