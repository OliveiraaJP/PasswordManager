import { NoteDataObj } from "../interfaces/safenotesInterface.js"
import * as noteRepository from "../repositories/safenoteRepository.js"
import { AppError } from "../utils/error.js"

export const hasUser = async (userId: number) => {
    const hasUser = await noteRepository.getUser(userId)
    if (!hasUser) {
        throw new AppError(404, 'User not found! :x')
    }
}

export const hasNote = async (titleNote: string) => {
    const hasTitleNote = await noteRepository.getTitle(titleNote)
    if (hasTitleNote) {
        throw new AppError(409, 'Note already exist! :x')
    }
}

export const createNote = async (noteObj: NoteDataObj) => {
    await noteRepository.createNote(noteObj)
}

export const getAllNotes = async (userId: number) => {
    const notes = await noteRepository.getAllNotes(userId)
    if (!notes) {
        throw new AppError(404, 'No notes registered! :x')
    }
    return notes
}

export const getOneNote = async (noteId: number, userId: number) => {
    const note = await noteRepository.getOneNote(noteId)
    if (!note) {
        throw new AppError(404, 'Note not found! xD')
    }

    if (note.userId !== userId) {
        throw new AppError(401, 'Unauthorized acess! ;-;')
    }
    return note
}

export const deleteNote = async (noteId: number, userId: number) => {
    const note = await noteRepository.getOneNote(noteId)
    if (!note) {
        throw new AppError(404, 'Note not found! xD')
    }

    if (note.userId !== userId) {
        throw new AppError(401, 'Unauthorized acess! ;-;')
    }

    await noteRepository.deleteNote(noteId)
}