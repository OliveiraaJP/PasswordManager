import { Router } from "express";
import { signin, signup } from "../controllers/authController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { signinSchema, signupSchema } from "../schemas/authSchema.js";


const authRouter = Router()

authRouter.post('/signup', validateSchemaMiddleware(signupSchema), signup)
authRouter.post('/signin', validateSchemaMiddleware(signinSchema), signin)

export default authRouter;