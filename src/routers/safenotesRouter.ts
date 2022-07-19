import { Router } from "express";
import { createNote, deleteNote, getAllNotes, getOneNote } from "../controllers/safenotesController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { tokenValidator } from "../middlewares/validateToken.js";
import { createNoteSchema } from "../schemas/safenoteSchema.js";

const notesRouter = Router()

notesRouter.use(tokenValidator)

notesRouter.post("/safenotes", validateSchemaMiddleware(createNoteSchema), createNote)
notesRouter.get("/safenotes", getAllNotes)
notesRouter.get("/safenotes/:id", getOneNote)
notesRouter.delete("/safenotes/:id", deleteNote)

export default notesRouter;