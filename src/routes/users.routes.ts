import { Router } from "express";
import { createUserController } from "../controllers/users";
import { ensureDataIsValidMiddleware, ensureEmailNotUsedMiddleware } from "../middlewares";
import { userCreateSchema } from "../schemas/users.schemas";

const usersRoutes = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(userCreateSchema),
  ensureEmailNotUsedMiddleware,
  createUserController
);

export default usersRoutes;
