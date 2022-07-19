import { Request, Response } from "express"
import { chalkLogger } from "../utils/chalkLog.js";
import { WifiDataObj, WifiDataReq } from "../interfaces/wifiInterface.js";
import * as wifiService from "../services/wifiService.js"

export async function createWifi(req: Request, res: Response) {
    const userId = res.locals.userId
    const wifiReq: WifiDataReq = req.body
    const wifiObj: WifiDataObj = {...wifiReq, userId}
    await wifiService.hasUser(wifiObj.userId)
    await wifiService.createWifi(wifiObj)
    res.status(201).send('wifi created bro skrr')
}

export async function getAllWifis(req: Request, res: Response) {
    const userId = res.locals.userId
    await wifiService.hasUser(userId)
    const wifis = await wifiService.getAllWifis(userId) 
    chalkLogger.logObject('controller', wifis)
    res.status(201).send(wifis)
}

export async function getOneWifi(req: Request, res: Response) {
    const userId = res.locals.userId
    const wifiId: number = Number(req.params.id)
    await wifiService.hasUser(userId) 
    const wifi = await wifiService.getOneWifi(userId, wifiId) 
    chalkLogger.logObject('controller', wifi)
    res.status(201).send(wifi)
}

export async function deleteWifi(req: Request, res: Response) {
    const userId = res.locals.userId
    const wifiId: number = Number(req.params.id)
    await wifiService.hasUser(userId) 
    await wifiService.deleteWifi(wifiId, userId)
    chalkLogger.log('controller', 'deleted')
    res.status(201).send('wifi deleted! xd')
}