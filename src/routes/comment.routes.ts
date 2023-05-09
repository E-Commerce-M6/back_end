import { Router } from "express";
import {
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware,
  ensureIsIdValidMiddleware,
  ensurePosterExistsMiddleware,
} from "../middlewares";
import { createCommentSchema, updateCommentSchema } from "../schemas/comment.schemas";
import { createCommentController, getCommentsByPostIdController } from "../controllers/comments";
import updateCommentController from "./../controllers/comments/updateComment.controller";
import ensureCommentOwnerMiddleware from "./../middlewares/ensureCommentOwner.middleware";

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

export default commentRoutes;
