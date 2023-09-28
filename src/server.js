import express from "express";
import morgan from "morgan";
import mainRouter from "./router/mainRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";
import session from "express-session";
import { localsMiddleware } from "./middlewares";
import MongoStore from "connect-mongo";

// main,user video 로  이루어진 라우터 설계

const app = express()
const logger = morgan(`dev`)
app.set(`view engine`,`pug`)
app.set("views", process.cwd() + "/src/views");
console.log(process.env.DB_URL)
app.use(logger)
app.use(express.urlencoded({extends:true}))

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create( {mongoUrl:  process.env.DB_URL,})
  }))

app.use(localsMiddleware)

app.use("/",mainRouter)
app.use("/user",userRouter)
app.use("/video",videoRouter)

export default app

