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
  ensureUserExistsMiddleware,
  ensureUserOwnerMiddleware,
} from "../middlewares";
import { userCreateSchema, userUpdateSchema } from "../schemas/users.schemas";
import updateUserController from "../controllers/users/updateUser.controller";
import deleteUserController from "./../controllers/users/deleteUser.controller";

const usersRoutes: Router = Router();

usersRoutes.get("/:id/posters", ensureUserExistsMiddleware, listPosterByUserController);
usersRoutes.get("/profile", ensureAuthMiddleware, getUserByTokenController);

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userCreateSchema),
  ensureEmailOrCpfNotUsedMiddleware,
  createUserController
);
usersRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(userUpdateSchema),
  ensureUserExistsMiddleware,
  ensureUserOwnerMiddleware,
  updateUserController
);
usersRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureUserExistsMiddleware,
  ensureUserOwnerMiddleware,
  deleteUserController
);

export default usersRoutes;
