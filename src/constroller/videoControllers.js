import Video from "../models/Video";

export const home = async (req,res) => {
    const {id} = req.params
    const videos = await Video.find({})
    return res.render("home",{pageTitle:"Home",videos})
}


export const see = async (req,res) => {
    const {id} = req.params
    const video = await Video.findById(id)
    if(!video)
    {
        res.render("404",{pageTitle:`not found video`})
    }
    else{
      return res.render("video",{pageTitle:`watching video${video.title}`,video})
    }
}
export const getEdit = async (req,res) => {
    const {id} = req.params
    const video = await Video.findById(id)
    if(!video)
    {
        res.render("404",{pageTitle:`not found video`})
    }
    else{
      return res.render("edit",{pageTitle:`watching video${video.title}`,video})
    }
}

export const  postEdit = async (req,res) => {
    const {id}= req.params
    const video = await Video.exists(id)
    if(!video)
    {
        res.render("404",{pageTitle:`not found video`})
    }
    else{
      await Video.findByIdAndUpdate(id,{
        title,
        description,
        hashtags:Video.formatHashtags(hashtags)
      })

      return res.render("video",{pageTitle:`watching video${video.title}`,video})
    }
}


export const getUpload = async (req,res) => {

    res.render("upload",{pageTitle:`upload video`})
}

export const postUpload =(req,res) => {
   const {title,description,hashtags} = req.body
   try{
    Video.create(
    {
         title,
         description,
         hashtags:Video.formatHashtags(hashtags)
     } 
    )
    return res.redirect(`/`)
   }
   catch
   {
      res.render("404",{pageTitle:`not found video`})
   }
}

export const deleteVideo = async (req,res)=>{
    const {id} = req.params
    await Video.findOneAndDelete({_id:id})
    res.redirect("/")
}

export const search = async (req,res) => {
    const {keyword} = req.query
    let videos =[]
    if(keyword)
    {
      videos = await Video.find({
        title: {
            $regex: new RegExp(`${keyword}$`,`i`)
        },
      })
    }
    res.render("serch",{pageTitle:'serch video',videos})
    
}