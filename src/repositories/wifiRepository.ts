import prisma from "../config/database.js";
import { WifiDataObj } from "../interfaces/wifiInterface.js";
import { chalkLogger } from "../utils/chalkLog.js";

export async function getUser(id: number) {
    return await prisma.user.findFirst({ where: { id } })
}

export async function createWifi(wifiObj: WifiDataObj) {
    chalkLogger.logObject('db', wifiObj)
    return await prisma.wifi.create({data: wifiObj})
}