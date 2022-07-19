import { Router } from "express";
import { createWifi, deleteWifi, getAllWifis, getOneWifi } from "../controllers/wifiController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { tokenValidator } from "../middlewares/validateToken.js";
import { createWifiSchema } from "../schemas/wifiSchema.js";

const wifiRouter = Router()

wifiRouter.use(tokenValidator)

wifiRouter.post("/wifis", validateSchemaMiddleware(createWifiSchema), createWifi)
wifiRouter.get("/wifis", getAllWifis)
wifiRouter.get("/wifis/wifi/:id", getOneWifi)
wifiRouter.delete("/wifis/wifi/:id", deleteWifi)

export default wifiRouter;