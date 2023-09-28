import express from "express";
import {see,getEdit,postEdit,getUpload,postUpload,deleteVideo} from "../constroller/videoControllers"
const videoRouter = express.Router()


videoRouter.get("/:id([0-9A-F]{24})",see)
videoRouter.route("/:id([0-9A-F]{24})/edit").get(getEdit).post(postEdit)
videoRouter.get("/:id([0-9A-F]{24})/deleteVideo",deleteVideo)
videoRouter.route("/upload").get(getUpload).post(postUpload)


export default videoRouter