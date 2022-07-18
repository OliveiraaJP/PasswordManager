import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { chalkLogger } from "../utils/chalkLog.js";


export async function tokenValidator(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    //chalkLogger.log('middleware', token)
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    //chalkLogger.log('middleware', decoded.jwtId)
    res.locals.userId = decoded.jwtId
    next();
}