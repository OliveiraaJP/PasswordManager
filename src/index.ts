import express, {json} from "express";
import cors from "cors"
import "express-async-errors"
import dotenv from "dotenv"
import { errorHandlerMiddleware } from "./middlewares/errorMiddleware.js";
import router from "./routers/index.js";


dotenv.config()

const app = express()

app.use(json())
app.use(cors())
app.use(router)
app.use(errorHandlerMiddleware)

const PORT = +process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))


