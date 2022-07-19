import { AppError } from "../utils/error.js"
import * as wifiRepository from "../repositories/wifiRepository.js"
import * as crypt from "../utils/cryptr.js"
import { WifiDataObj } from "../interfaces/wifiInterface.js"

export const hasUser = async (userId: number) => {
    const hasUser = await wifiRepository.getUser(userId)
    if (!hasUser) {
        throw new AppError(404, 'User not found! :x')
    }
}

export const createWifi = async (wifiObj: WifiDataObj) => {
    const { password } = wifiObj
    const cryptPass = crypt.encrypt(password)
    await wifiRepository.createWifi({ ...wifiObj, password: cryptPass })
}