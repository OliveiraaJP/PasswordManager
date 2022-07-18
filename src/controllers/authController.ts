import { Request, Response } from "express";
import { chalkLogger } from "../utils/chalkLog.js";
import { UserData } from "../interfaces/authInterface.js";
import * as authService from "../services/authService.js"

export async function signup(req: Request, res: Response) {
    const { name ,user, password}: UserData = req.body
    const userObj = {name, user, password}
    await authService.signup(userObj)
    res.status(201).send('Registered User :D')
}

export async function signin(req: Request, res: Request) {
    
}