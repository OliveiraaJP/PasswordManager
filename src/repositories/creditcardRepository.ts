import prisma from "../config/database.js"
import { CardDataObj } from "../interfaces/creditcardInterface.js"
import { chalkLogger } from "../utils/chalkLog.js"

export async function getUser(id: number) {
    return await prisma.user.findFirst({ where: { id } })
}

export async function getTitle(title: string, userId: number) {
    return await prisma.card.findFirst({
        where: {
            title: {
                equals: title,
                mode: 'insensitive'
            }, // insensitive case
            userId
        }
    })
}

export async function createCard (cardObj: CardDataObj) {
    chalkLogger.logObject('db', cardObj)
    return await prisma.card.create({data: cardObj})
}