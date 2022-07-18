import { Router } from "express";
import { signin, signup } from "../controllers/authController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { signupSchema } from "../schemas/signupSchema.js";

const authRouter = Router()

authRouter.post('/signup', validateSchemaMiddleware(signupSchema), signup)
authRouter.post('/signin', signin)

export default authRouter;