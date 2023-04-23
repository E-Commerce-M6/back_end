import { Router } from "express";
import { createUserController, listPosterByUserController } from "../controllers/users";
import { ensureDataIsValidMiddleware, ensureEmailNotUsedMiddleware } from "../middlewares";
import { userCreateSchema } from "../schemas/users.schemas";
import { ensureUserExistsMiddleware } from "../middlewares/users";

const usersRoutes = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userCreateSchema),
  ensureEmailNotUsedMiddleware,
  createUserController
);
usersRoutes.get("/:id/posters", ensureUserExistsMiddleware, listPosterByUserController);

export default usersRoutes;
