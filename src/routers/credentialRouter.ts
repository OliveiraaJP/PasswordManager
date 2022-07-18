import { Router } from "express";
import { deleteCredential, getAllCredentials, getOneCredential, postCredential, } from "../controllers/crendentialsController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { tokenValidator } from "../middlewares/validateToken.js";
import { createCredentialSchema } from "../schemas/credentialSchema.js";

const credentialRouter = Router();

credentialRouter.use(tokenValidator)
credentialRouter.post("/credentials", validateSchemaMiddleware(createCredentialSchema), postCredential);

credentialRouter.get("/credentials", getAllCredentials);

credentialRouter.get("/credentials/credential/:id", getOneCredential);

credentialRouter.delete("/credentials/credential/:id", deleteCredential);

export default credentialRouter;
