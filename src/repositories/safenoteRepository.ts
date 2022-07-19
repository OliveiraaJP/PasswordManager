import prisma from "../config/database.js"
import { NoteDataObj } from "../interfaces/safenotesInterface.js"

export async function getUser(id: number) {
    return await prisma.user.findFirst({ where: { id } })
}

export async function getTitle(title: string) {
    return await prisma.note.findFirst({ where: { title } })
}

export async function createNote(noteObj: NoteDataObj) {
    return await prisma.note.create({ data: noteObj })
}