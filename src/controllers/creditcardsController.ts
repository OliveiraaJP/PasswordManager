import { Request, Response } from "express";
import { CardDataObj, CardDataReq } from "../interfaces/creditcardInterface.js";
import { chalkLogger } from "../utils/chalkLog.js";
import * as cardService from "../services/creditcardService.js"

export async function createCard(req: Request, res: Response) {
    const userId = res.locals.userId
    const cardReq: CardDataReq = req.body
    const cardObj: CardDataObj = {...cardReq, userId}
    await cardService.hasUser(userId)
    await cardService.hasCard(cardObj.title, cardObj.userId)
    await cardService.createCard(cardObj)
    res.status(201).send('created card')
}

export async function getAllCards(req: Request, res: Response) {
    const userId = res.locals.userId
    await cardService.hasUser(userId)
    const cards = await cardService.getAllCards(userId)
    chalkLogger.logObject('controller', cards)
    res.status(201).send(cards)
}

export async function getOneCard(req: Request, res: Response) {
    const userId = res.locals.userId
    const cardId: number = Number(req.params.id)
    await cardService.hasUser(userId)
    const card = await cardService.getOneCard(userId, cardId)
    //chalkLogger.logObject('controller', card)
    res.status(201).send(card)
}

export async function deleteCard(req: Request, res: Response) {
    const userId = res.locals.userId
}