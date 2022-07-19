import { Request, Response } from "express";
import { NoteDataObj, NoteDataReq } from "../interfaces/safenotesInterface.js";
import { chalkLogger } from "../utils/chalkLog.js";
import * as noteService from "../services/safenoteService.js"


export async function createNote(req: Request, res: Response) {
    const userId = res.locals.userId
    const safeNoteReq: NoteDataReq = req.body
    const safeNoteObj: NoteDataObj = { ...safeNoteReq, userId }
    await noteService.hasUser(userId)
    await noteService.hasNote(safeNoteObj.title)
    await noteService.createNote(safeNoteObj)
    chalkLogger.log('controller', 'created note')
    res.status(201).send('Note created! :D')
}

export async function getAllNotes(req: Request, res: Response) {
    const userId = res.locals.userId
    await noteService.hasUser(userId)
    const notes = await noteService.getAllNotes(userId)
    chalkLogger.logObject('controller', notes)
    res.status(201).send(notes)
}

export async function getOneNote(req: Request, res: Response) {
    const userId = res.locals.userId
    const noteId: number = Number(req.params.id)
    await noteService.hasUser(userId)
    const note = await noteService.getOneNote(noteId, userId)
    chalkLogger.logObject('controller', note)
    res.status(201).send(note)
}

export async function deleteNote(req: Request, res: Response) {
    const userId = res.locals.userId
    const noteId: number = Number(req.params.id)
    await noteService.hasUser(userId)
    await noteService.deleteNote(noteId, userId)
    chalkLogger.log('controller', 'deleted')
    res.status(201).send('deleted note')
}