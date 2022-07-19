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