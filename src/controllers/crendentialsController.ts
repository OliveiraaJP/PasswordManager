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
    
}

export async function deleteCredential(req: Request, res: Response) {

}