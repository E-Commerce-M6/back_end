import { Router } from "express";
import { createUserController } from "../controllers/users";
import { ensureDataIsValidMiddleware, ensureEmailNotUsedMiddleware } from "../middlewares";
import { userCreateSchema } from "../schemas/users.schemas";
import loginUserController from "../controllers/users/loginUser.controller";

const usersRoutes = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userCreateSchema),
  ensureEmailNotUsedMiddleware,
  createUserController
);

usersRoutes.post(
  "/login",
  loginUserController
);

export default usersRoutes;
