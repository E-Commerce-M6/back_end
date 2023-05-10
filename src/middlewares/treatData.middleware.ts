import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/AppError"

const treatDataMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (req.body.posterData === undefined){
		req.body = {}
	} else {
		req.body = JSON.parse(req.body.posterData.replace(/\\/g, ''))
	}
	return next()
}

export default treatDataMiddleware