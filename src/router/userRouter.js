import express from "express";
import {getEdit,postEdit,remove,logout,see} from "../constroller/userControllers"
import { publicOnly, privateOnly } from "../middlewares";
import multer from "multer";
const userRouter = express.Router()
const upload = multer(
    {
        dest: './uploads' 
    }
)


userRouter.get("/remove",privateOnly,remove)
userRouter.route("/edit").all(privateOnly).get(getEdit).post(upload.single('profileImage'),postEdit)
userRouter.get("/:id(\\d+)",privateOnly,see)
userRouter.get("/logout",privateOnly,logout)

export default userRouter