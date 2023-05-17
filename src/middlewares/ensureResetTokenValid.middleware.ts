import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

const ensureResetTokenValidMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.params.resetToken;

  if (!token) {
    throw new AppError("Invalid token", 401);
  }

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      if (error.message == "jwt expired") {
        throw new AppError("Token expired, make a new request", 401);
      }
      if (error.message == "jwt malformed") {
        throw new AppError("Invalid token", 401);
      }
      throw new AppError(error.message, 401);
    }

    req.user = {
      id: String(decoded.sub),
      isSeller: decoded.isSeller,
    };

    return next();
  });
};

export default ensureResetTokenValidMiddleware;
