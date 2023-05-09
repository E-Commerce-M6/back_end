import { Router } from "express";
import {
  ensureAuthMiddleware,
  ensureCommentExistsMiddleware,
  ensureCommentOwnerMiddleware,
  ensureDataIsValidMiddleware,
  ensureIsIdValidMiddleware,
  ensurePosterExistsMiddleware,
} from "../middlewares";
import { createCommentSchema, updateCommentSchema } from "../schemas/comment.schemas";
import { createCommentController, deleteCommentController, getCommentsByPostIdController, updateCommentController } from "../controllers/comments";


const commentRoutes: Router = Router();

commentRoutes.post(
  "/:id/comments",
  ensureAuthMiddleware,
  ensureIsIdValidMiddleware,
  ensurePosterExistsMiddleware,
  ensureDataIsValidMiddleware(createCommentSchema),
  createCommentController
);

commentRoutes.patch(
  "/comments/:id",
  ensureAuthMiddleware,
  ensureCommentExistsMiddleware,
  ensureCommentOwnerMiddleware,
  ensureDataIsValidMiddleware(updateCommentSchema),
  updateCommentController
);

commentRoutes.get(
  "/comments/:id",
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
  deleteCommentController,
);

export default commentRoutes;
