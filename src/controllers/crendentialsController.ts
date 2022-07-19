import { Request, Response } from "express";
import { CredentialDataObj, CredentialDataReq } from "../interfaces/credentialInterface.js";
import * as credentialService from "../services/credentialService.js"
import { chalkLogger } from "../utils/chalkLog.js";

export async function getAllCredentials(req: Request, res: Response) {
    const userId = res.locals.userId
    await credentialService.hasUser(userId)
    const credentials = await credentialService.getAllCredentials(userId)
    chalkLogger.logObject('controller', credentials)
    res.status(201).send(credentials)
}

export async function getOneCredential(req: Request, res: Response) {
    const localsId = res.locals.userId
    const credentialId: number = Number(req.params.id)
    await credentialService.hasUser(localsId)
    const credential = await credentialService.getOneCredential(credentialId, localsId)
    chalkLogger.logObject('controller', credential)
    res.status(201).send(credential)
}

export async function postCredential(req: Request, res: Response) {
    const localsId = res.locals.userId
    chalkLogger.log('controller', localsId)
    const credentialReq: CredentialDataReq = req.body
    const credentialObj: CredentialDataObj = { ...credentialReq, userId: localsId }
    await credentialService.hasUser(credentialObj.userId)
    await credentialService.hasCredential(credentialObj.title, credentialObj.userId)
    await credentialService.createCredential(credentialObj)
    res.status(201).send('Created Credential! >D')
}

export async function deleteCredential(req: Request, res: Response) {

}