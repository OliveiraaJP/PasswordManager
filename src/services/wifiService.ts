import { AppError } from "../utils/error.js"
import * as wifiRepository from "../repositories/wifiRepository.js"
import * as crypt from "../utils/cryptr.js"
import * as decrypter from "../utils/decryptAllPasses.js"
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

export const getAllWifis = async (userId: number) => {
    const wifis = await wifiRepository.getAllWifis(userId)
    if(!wifis){
        throw new AppError(404, 'No wifi registered! x_X')
    }
    const decryptAllPasses = await decrypter.mapToDecryptWifi(wifis)
    if(decryptAllPasses.length === 0 ){
        throw new AppError(404, 'Wifis not found! :ooo')
    }
    return decryptAllPasses
}

export const getOneWifi = async (userId: number, wifiId: number) => {
    const wifi = await wifiRepository.getOneWifi(wifiId)
    if (!wifi) {
        throw new AppError(404, 'Credential not found! :o')
    }

    if (wifi.userId !== userId) {
        throw new AppError(401, 'Unauthorized credential :x')
    }

    const {password} = wifi
    const decryptPass = crypt.decrypt(password)
    return {...wifi, password: decryptPass}
}
