import { CardDataObj } from "../interfaces/creditcardInterface.js"
import * as cardRepository from "../repositories/creditcardRepository.js"
import * as crypt from "../utils/cryptr.js"
import { AppError } from "../utils/error.js"

export const hasUser = async (userId: number) => {
    const hasUser = await cardRepository.getUser(userId)
    if (!hasUser) {
        throw new AppError(404, 'User not found!')
    }
}

export const hasCard = async (title: string, userId: number) => {
    const hasCard = await cardRepository.getTitle(title, userId)
    if (hasCard) {
        throw new AppError(409, 'Card already exist! ;-;')
    }
}

export const createCard = async (cardObj: CardDataObj) => {
    const { password, securityCode } = cardObj
    const cryptPass = crypt.encrypt(password)
    const cryptSecurityCode = crypt.encrypt(securityCode)
    await cardRepository.createCard({
        ...cardObj,
        password: cryptPass,
        securityCode: cryptSecurityCode
    })
}