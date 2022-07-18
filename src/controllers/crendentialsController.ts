import { Request, Response } from "express";
import { CredentialDataObj, CredentialDataReq } from "../interfaces/credentialInterface.js";
import * as credentialService from "../services/credentialService.js"
import { chalkLogger } from "../utils/chalkLog.js";

export async function getAllCredentials(req: Request, res: Response) {
    const userId = res.locals.userId
    await credentialService.hasUser(userId)
    const credentials = await credentialService.getAllCredentials(userId)
    res.status(201).send(credentials)
}

export async function getOneCredential(req: Request, res: Response) {
    const localsId = res.locals.userId
    chalkLogger.log('controller', localsId)
    res.send('oi').status(777)
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