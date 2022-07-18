import { CredentialDataObj } from "../interfaces/credentialInterface.js"
import * as credentialRepository from "../repositories/credentialRepository.js"
import * as crypt from "../utils/cryptr.js"
import { AppError } from "../utils/error.js"


export const hasUser = async (userId:number) => {
    const hasUser = await credentialRepository.getUser(userId)
    if(!hasUser){
        throw new AppError(404, 'User not found!')
    }
}

export const hasCredential = async (title: string, userId: number) => {
    const hasCredential = await credentialRepository.getCredential(title, userId)
    if(hasCredential){
        throw new AppError(409, 'Credential already created!')
    }
}

export const createCredential = async (credentialObj: CredentialDataObj) => {
    const {password} = credentialObj
    const cryptPass = await crypt.encrypt(password)
    const sentCredential = {...credentialObj, password: cryptPass}
    await credentialRepository.createCredential(sentCredential)
}