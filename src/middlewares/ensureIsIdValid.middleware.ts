import { NextFunction, Request, Response } from "express";
import { validate } from "uuid";
import { AppError } from "../errors/AppError";

const ensureIsIdValidMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const uuidValid = validate(id);

  if (!uuidValid) {
    throw new AppError("Invalid id", 400);
  }

  next();
};

export default ensureIsIdValidMiddleware;
