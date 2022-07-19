import { CredentialDataObj } from "../interfaces/credentialInterface.js"
import * as credentialRepository from "../repositories/credentialRepository.js"
import * as crypt from "../utils/cryptr.js"
import * as decrypter from "../utils/decryptAllPasses.js"
import { AppError } from "../utils/error.js"


export const hasUser = async (userId: number) => {
    const hasUser = await credentialRepository.getUser(userId)
    if (!hasUser) {
        throw new AppError(404, 'User not found!')
    }
}

export const hasCredential = async (title: string, userId: number) => {
    const hasCredential = await credentialRepository.getCredential(title, userId)
    if (hasCredential) {
        throw new AppError(409, 'Credential already created!')
    }
}

export const createCredential = async (credentialObj: CredentialDataObj) => {
    const { password } = credentialObj
    const cryptPass = await crypt.encrypt(password)
    const sentCredential = { ...credentialObj, password: cryptPass }
    await credentialRepository.createCredential(sentCredential)
}

export const getAllCredentials = async (userId: number) => {
    const credentials = await credentialRepository.getAllCredentials(userId)
    if (!credentials) {
        throw new AppError(404, 'Credentials not found! :o ')
    }

    const decryptAllPasses = await decrypter.mapToDecrypt(credentials)
    if(decryptAllPasses.length === 0 ){
        throw new AppError(404, 'Credentials not found! :ooo')
    }
    return decryptAllPasses
}

export const getOneCredential = async (credentialId: number, userId: number) => {
    const hasCredential = await credentialRepository.getOneCredential(credentialId)
    if (!hasCredential) {
        throw new AppError(404, 'Credential not found! :o')
    }

    if (hasCredential.userId !== userId) {
        throw new AppError(401, 'Unauthorized credential :x')
    }

    const { password } = hasCredential
    const decryptPass = crypt.decrypt(password)
    return { ...hasCredential, password: decryptPass }
}

export const deleteCredential = async (credentialId: number, userId: number) => {
    const hasCredential = await credentialRepository.getOneCredential(credentialId)
    if (!hasCredential) {
        throw new AppError(404, 'Credential not found! :o')
    }

    if (hasCredential.userId !== userId) {
        throw new AppError(401, 'Unauthorized credential :x')
    }

    await credentialRepository.deleteCredential(credentialId)
}