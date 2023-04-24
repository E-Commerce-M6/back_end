import { Router } from "express";
import { createUserController, listPosterByUserController } from "../controllers/users";
import { ensureDataIsValidMiddleware, ensureEmailOrCpfNotUsedMiddleware } from "../middlewares";
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

export default usersRoutes;
