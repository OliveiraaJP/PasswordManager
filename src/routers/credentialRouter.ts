import { Router } from "express";
import { deleteCredential, getAllCredentials, getOneCredential, postCredential } from "../controllers/crendentialsController.js";

const credentialRouter = Router()

credentialRouter.post('/credentials', postCredential)
credentialRouter.get('/credentials', getAllCredentials)
credentialRouter.get('/credentials/credential/:id', getOneCredential)
credentialRouter.delete('/credentials/credential/:id', deleteCredential)

export default credentialRouter;