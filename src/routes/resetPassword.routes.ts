import { Router } from "express";
import {
  resetPasswordController,
  sendResetEmailPasswordController,
} from "../controllers/resetPassword";
import { ensureDataIsValidMiddleware, ensureResetTokenValidMiddleware } from "../middlewares";
import {
  resetPasswordSchema,
  sendResetEmailPasswordSchema,
} from "../schemas/sendResetEmailPassword.schemas";

const resetPasswordRoutes: Router = Router();

resetPasswordRoutes.post(
  "",
  ensureDataIsValidMiddleware(sendResetEmailPasswordSchema),
  sendResetEmailPasswordController
);

resetPasswordRoutes.patch(
  "/:resetToken",
  ensureResetTokenValidMiddleware,
  ensureDataIsValidMiddleware(resetPasswordSchema),
  resetPasswordController
);

export default resetPasswordRoutes;
