import { Router } from "express";
import {
  createUserController,
  getUserByTokenController,
  listPosterByUserController,
} from "../controllers/users";
import {
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware,
  ensureEmailOrCpfNotUsedMiddleware,
} from "../middlewares";
import { userCreateSchema } from "../schemas/users.schemas";
import { ensureUserExistsMiddleware } from "../middlewares";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userCreateSchema),
  ensureEmailOrCpfNotUsedMiddleware,
  createUserController
);
usersRoutes.get("/:id/posters", ensureUserExistsMiddleware, listPosterByUserController);
usersRoutes.get("/profile", ensureAuthMiddleware, getUserByTokenController);

export default usersRoutes;
