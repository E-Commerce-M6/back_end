import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares";
import { createCommentSchema } from "../schemas/comment.schemas";
import createCommentController from "./../controllers/comments/createComment.controller";
import ensureAuthMiddleware from "./../middlewares/ensureAuth.middleware";
import ensurePosterExistsMiddleware from "./../middlewares/ensurePosterExists.middleware";
import getCommentsByPostIdController from "../controllers/comments/getCommentsByposterId.controller";

const commentRoutes: Router = Router();

commentRoutes.post(
  "/:id",
  ensureAuthMiddleware,
  ensurePosterExistsMiddleware,
  ensureDataIsValidMiddleware(createCommentSchema),
  createCommentController
);

export default commentRoutes;
