import Account from "../models/Account";
import bcrypt from "bcrypt"


export const getJoin = (req,res) => {
    res.render("join",{pageTitle:"Join"})
}

export const postJoin =  async (req,res) => {
   const { email,username, password,password2,name,location} = req.body
   const exsits =  await Account.exists({$or: [{username},{email}]} )
   if(exsits)
   {
     return res.status(400).render("join",{pageTitle:"Join",errorMessage:"This username/email is already taken."})
   }
   if(password != password2)
   {
    return res.status(400).render("join",{pageTitle:"Join",errorMessage:"please check password."})
   }    
   await Account.create(
    {
        email,
        username,
        password,
        name,
        location
    }
   )
   res.redirect("/login")
}

export const getLogin= (req,res) =>{
    res.render("login",{pageTitle:"Log in"})
}

export const postLogin= async (req,res) =>{
    const{username,password} = req.body
    const account = await Account.findOne({username})
    if(!account)
    {  
        return res.status(400).render("login",{pageTitle:"Log in",errorMessage:"can't find username"})
    }
    const comp = await bcrypt.compare(password,account.password)
    if(!comp)
    {
        return res.status(400).render("login",{pageTitle:"Log in",errorMessage:"wrong password"})
    }
    req.session.account = account
    req.session.loggedIn = true
    return  res.redirect("/")


}

export const githubLogin = async(req,res)=>
{

}

export const getEdit = (req,res) => {
      res.render("edit-profile")
}

export const postEdit = async (req,res) => {
    const {session:{
          account:{_id ,email: sessionEmail, username: sessionUsername}
          },
          file,
          body:{name,email,username,location}} = req
    const imgSrc = file ? file.path : '';

    let check_list =[]
    if(sessionEmail != email)
    {
        check_list.push({email})
    }
    if(sessionUsername != username)
    {
        check_list.push({username})
    }
    if(check_list.length >0)
    {
        const user =await Account.findOne({ $or: check_list })
        if(user)
        {
            return res.render("edit-profile",{errorMessage:"exiting username or email"})
        }
    }

    const updateAccountData = await Account.findByIdAndUpdate(_id,{
        imgSrc,
        name,
        email,
        username,
        location,
    },{new: true})
    req.session.account = updateAccountData
    res.redirect("/user/edit")
}

export const remove = (req,res) => res.send(`remove user ${req.params.id}`)
export const logout = (req,res) => {
    req.session.destroy()
    res.redirect('/')
}
export const see = (req,res) => res.send(`hello user ${req.params.id}`)