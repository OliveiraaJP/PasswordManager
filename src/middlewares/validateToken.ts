import { Request, Response, NextFunction  } from "express";
import jwt from "jsonwebtoken"


export async function tokenValidator(req:Request, res:Response, next: NextFunction){
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ','');
    const decoded =  jwt.verify(token, process.env.JWT_SECRET);       
    res.locals.userId = decoded.id;
    next();    
}