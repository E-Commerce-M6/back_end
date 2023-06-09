import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

const treatDataMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.posterData === undefined) {
    throw new AppError("Expect posterData object", 400);
  } else {
    req.body = JSON.parse(req.body.posterData);
  }
  return next();
};

export default treatDataMiddleware;
