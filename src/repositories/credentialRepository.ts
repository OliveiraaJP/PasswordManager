import prisma from "../config/database.js"
import { CredentialDataObj } from "../interfaces/credentialInterface.js"

export async function getUser(id: number) {
    return await prisma.user.findFirst({ where: { id } })
}

export async function getCredential(title: string, userId: number) {
    return await prisma.credential.findFirst({
        where: {
            title: { mode: 'insensitive' }, // insensitive case
            userId
        }
    })
}

export async function createCredential(credentialObj: CredentialDataObj) {
    return await prisma.credential.create({ data: credentialObj })
}

export async function getAllCredentials(userId: number) {
    return await prisma.credential.findMany({ where: { userId } })
}

export async function getOneCredential(credentialId: number) {
    return await prisma.credential.findFirst({ where: { id: credentialId } })
}