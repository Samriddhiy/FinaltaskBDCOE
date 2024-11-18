import cors from "cors"
import dotenv from "dotenv"
import express from "express"

import cookieParser from "cookie-parser"
const app= express()

dotenv.config({
    path:"../.env"
})

app.use(cors({
    origin: "process.env.PORT",
    credentials: true
}));


app.use(express.json ({}));
app.use(express.urlencoded ({extended: true}));
app.use(express.static("public"));
app.use(cookieParser())

// routes import 
import userRouter from './routes/user.routes.js'

// routes declaration 

app.use("/api/v1/users", userRouter)
export { app }