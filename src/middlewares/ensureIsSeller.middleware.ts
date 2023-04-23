import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';

const ensureIsSellerMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (!req.user.isSeller) {
        throw new AppError('Not Authorization', 401);
    }

    return next();
};

export default ensureIsSellerMiddleware;
