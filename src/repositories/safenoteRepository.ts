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

export async function getAllNotes(userId: number) {
    return await prisma.note.findMany({ where: { userId } })
}

export async function getOneNote(noteId: number) {
    return await prisma.note.findFirst({ where: { id: noteId } })
}
export async function deleteNote(noteId: number) {
    return await prisma.note.delete({ where: { id: noteId } })
}