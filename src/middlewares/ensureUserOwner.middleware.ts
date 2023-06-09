import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

const ensureUserOwnerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.params.id !== req.user.id) {
    throw new AppError("You do not have permission do perform this action", 403);
  }

  return next();
};

export default ensureUserOwnerMiddleware;
