import { Router } from "express";
import { createCard, deleteCard, getAllCards, getOneCard } from "../controllers/creditcardsController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { tokenValidator } from "../middlewares/validateToken.js";
import { createCardSchema } from "../schemas/credtcardSchema.js";

const cardRouter = Router()

cardRouter.use(tokenValidator)

cardRouter.post("/cards", validateSchemaMiddleware(createCardSchema) ,createCard)
cardRouter.get("/cards", getAllCards)
cardRouter.get("/cards/card/:id", getOneCard)
cardRouter.delete("/cards/card/:id", deleteCard)

export default cardRouter;