import { Request, Response } from "express";
import { CredentialDataObj, CredentialDataReq } from "../interfaces/credentialInterface.js";
import * as credentialService from "../services/credentialService.js"

const mockId = 1

export async function getAllCredentials(req: Request, res: Response) {
    res.status(777).send('abusadão')
}

export async function getOneCredential(req: Request, res: Response) {

}

export async function postCredential(req: Request, res: Response) {
    const credentialReq: CredentialDataReq = req.body
    const credentialObj: CredentialDataObj = { ...credentialReq, userId: mockId }
    await credentialService.hasUser(credentialObj.userId)
    await credentialService.hasCredential(credentialObj.title, credentialObj.userId)
    await credentialService.createCredential(credentialObj)
    res.status(201).send('Created Credential! >D')
}

export async function deleteCredential(req: Request, res: Response) {

}