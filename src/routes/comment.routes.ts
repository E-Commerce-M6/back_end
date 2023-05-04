import { Router } from "express";
import {
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware,
  ensureIsIdValidMiddleware,
  ensurePosterExistsMiddleware,
} from "../middlewares";
import { createCommentSchema } from "../schemas/comment.schemas";
import { createCommentController } from "../controllers/comments";

const commentRoutes: Router = Router();

commentRoutes.post(
  "/:id",
  ensureAuthMiddleware,
  ensureIsIdValidMiddleware,
  ensurePosterExistsMiddleware,
  ensureDataIsValidMiddleware(createCommentSchema),
  createCommentController
);

export default commentRoutes;
