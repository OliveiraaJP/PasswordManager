import { Router } from "express";
import authRouter from "./authRouter.js";
import credentialRouter from "./credentialRouter.js";
import cardRouter from "./creditcardsRouter.js";
import notesRouter from "./safenotesRouter.js";
import wifiRouter from "./wifiRouter.js";

const router = Router()

router.use(authRouter)
router.use(credentialRouter)
router.use(cardRouter)
router.use(notesRouter)
router.use(wifiRouter)

export default router;