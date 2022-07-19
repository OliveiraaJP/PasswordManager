import { CardDataObj } from "../interfaces/creditcardInterface.js"
import * as cardRepository from "../repositories/creditcardRepository.js"
import * as crypt from "../utils/cryptr.js"
import * as decrypter from "../utils/decryptAllPasses.js"
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

export const getAllCards = async (userId: number) => {
    const cards = await cardRepository.getAllCards(userId)
    if (!cards) {
        throw new AppError(404, 'No cards registered! :p')
    }
    const decryptAllPasses = await decrypter.mapToDecryptCard(cards)
    if (decryptAllPasses.length === 0) {
        throw new AppError(404, 'Cards not found! :ooo')
    }
    return decryptAllPasses
}

export const getOneCard = async (userId: number, cardId: number) => {
    const card = await cardRepository.getOneCard(cardId)
    if (!card) {
        throw new AppError(404, 'Credential not found! :o')
    }

    if (card.userId !== userId) {
        throw new AppError(401, 'Unauthorized credential :x')
    }

    const { password, securityCode } = card
    const decryptPass = crypt.decrypt(password)
    const decryptCode = crypt.decrypt(securityCode)

    return { ...card, password: decryptPass, securityCode: decryptCode }
}