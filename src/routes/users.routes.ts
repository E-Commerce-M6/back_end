import { Router } from "express";
import { createUserController, listPosterByUserController } from "../controllers/users";
import { ensureDataIsValidMiddleware, ensureEmailNotUsedMiddleware } from "../middlewares";
import { userCreateSchema } from "../schemas/users.schemas";
import loginUserController from "../controllers/users/loginUser.controller";
import { ensureUserExistsMiddleware } from "../middlewares/users";


const usersRoutes = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userCreateSchema),
  ensureEmailNotUsedMiddleware,
  createUserController
);
usersRoutes.get("/:id/posters", ensureUserExistsMiddleware, listPosterByUserController);

usersRoutes.post(
  "/login",
  loginUserController
);

export default usersRoutes;
