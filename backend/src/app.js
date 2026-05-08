import express from "express"
import cors from "cors"
import morgan from "morgan"
import chatRouter from "./routes/chat.routes.js"

const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
}))
app.use(morgan("dev"))


app.use("/api/chat", chatRouter)

export default app;

