import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserByTokenController,
  listPosterByUserController,
  updateUserController,
} from "../controllers/users";
import {
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware,
  ensureEmailOrCpfNotUsedMiddleware,
  ensureIsIdValidMiddleware,
  ensureUserExistsMiddleware,
  ensureUserOwnerMiddleware,
} from "../middlewares";
import { userCreateSchema, userUpdateSchema } from "../schemas/users.schemas";

const usersRoutes: Router = Router();

usersRoutes.get(
  "/:id/posters",
  ensureIsIdValidMiddleware,
  ensureUserExistsMiddleware,
  listPosterByUserController
);
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
  ensureIsIdValidMiddleware,
  ensureDataIsValidMiddleware(userUpdateSchema),
  ensureUserExistsMiddleware,
  ensureUserOwnerMiddleware,
  ensureEmailOrCpfNotUsedMiddleware,
  updateUserController
);
usersRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsIdValidMiddleware,
  ensureUserExistsMiddleware,
  ensureUserOwnerMiddleware,
  deleteUserController
);

export default usersRoutes;
