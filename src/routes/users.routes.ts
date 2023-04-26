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
import { userCreateSchema, userUpdateSchema } from "../schemas/users.schemas";
import { ensureUserExistsMiddleware } from "../middlewares";
import updateUserController from "../controllers/users/updateUser.controller";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userCreateSchema),
  ensureEmailOrCpfNotUsedMiddleware,
  createUserController
);
usersRoutes.patch(
  "",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(userUpdateSchema),
  updateUserController
);
usersRoutes.get("/:id/posters", ensureUserExistsMiddleware, listPosterByUserController);
usersRoutes.get("/profile", ensureAuthMiddleware, getUserByTokenController);

export default usersRoutes;
