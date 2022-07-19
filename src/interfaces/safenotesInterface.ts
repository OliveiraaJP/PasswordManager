import { Note } from "@prisma/client";

export type NoteDataObj = Omit<Note, 'id' | 'createdAt'>

export type NoteDataReq = Omit<NoteDataObj, 'userId'>