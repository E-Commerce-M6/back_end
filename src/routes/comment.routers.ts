import { Router } from "express";
import getCommentsByPostIdController from "../controllers/comments/getCommentsByPosterId.controller";
import { ensureDataIsValidMiddleware } from "../middlewares";
import { createCommentSchema } from "../schemas/comment.schemas";
import createCommentController from "./../controllers/comments/createComment.controller";
import ensureAuthMiddleware from "./../middlewares/ensureAuth.middleware";
import ensurePosterExistsMiddleware from "./../middlewares/ensurePosterExists.middleware";


const commentRoutes: Router = Router();

commentRoutes.post(
  "/:id",
  ensureAuthMiddleware,
  ensurePosterExistsMiddleware,
  ensureDataIsValidMiddleware(createCommentSchema),
  createCommentController
);

commentRoutes.get("/:id",ensureAuthMiddleware,ensurePosterExistsMiddleware,getCommentsByPostIdController)

export default commentRoutes;
