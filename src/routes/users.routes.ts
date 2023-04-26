import { Router } from "express";
import { createUserController, listPosterByUserController } from "../controllers/users";
import { ensureDataIsValidMiddleware, ensureEmailOrCpfNotUsedMiddleware } from "../middlewares";
import { userCreateSchema } from "../schemas/users.schemas";
import { ensureUserExistsMiddleware } from "../middlewares";
import deleteUserController from './../controllers/users/deleteUser.controller';
import ensureAuthMiddleware from './../middlewares/ensureAuth.middleware';

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userCreateSchema),
  ensureEmailOrCpfNotUsedMiddleware,
  createUserController
);
usersRoutes.get("/:id/posters", ensureUserExistsMiddleware, listPosterByUserController);
usersRoutes.delete("/:id",ensureAuthMiddleware,ensureUserExistsMiddleware,deleteUserController)

export default usersRoutes;
