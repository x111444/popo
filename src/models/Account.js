import mongoose from "mongoose";
import bcrypt from "bcrypt"


const  accountSchema = new mongoose.Schema({
       ImgSrc: String,
       onlySocial:{type:Boolean,default:false,required: true},
       email: {type:String,required: true},
       username: {type:String,required: true},
       password: String,
       name: {type:String,required: true},
       location: String
    },
  );



 accountSchema.pre("save", async function()
 {
    this.password = await bcrypt.hash(this.password,5)
 })

const Account = mongoose.model("Account",accountSchema)

export default Account