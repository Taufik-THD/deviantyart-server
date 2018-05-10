const Picture = require ("../models/picture")

module.exports={
    getAllpictures:(req,res,next)=>{
        Picture.find({})
        .then(pic=>{
            res.send(pic)
        })
        .catch(err=>{
            res.send(err)
        })
    },

    getPicturesByUserId:(req,res,next)=>{
       Picture.find({user_id:req.params.id})
       .then(pic=>{
           res.send(pic)
       })
       .catch(err=>{
           res.send(err)
       })
    },

    getPicturesByCategory:(req,res,next)=>{
        console.log('masuk ga')
        Picture.find({category:req.params.category})
        .then(pic=>{
            res.send(pic)
        })
        .catch(err=>{
            res.send(req.params)
        })
    },

  
    upload:(req,res)=>{
        let newPicture = new Picture({
            user_id:req.body.userid,
            description:req.body.description,
            category:req.body.category,
            likes :0,
            pic_url:req.file.cloudStoragePublicUrl

        })

        newPicture.save((error,picture)=>{
            if(error) res.status(500).send(error)
            else{
                return res.json(picture)
            }
        })
    },

    deletePic:(req,res,next)=>{
        Picture.findByIdAndRemove(req.params.id,(err,result)=>{
            if(err) res.status(500).json(error)
            else{
                res.json({message : 'picture deleted'})
            }
        })
    },

    addLikes:(req,res,next)=>{
       Picture.findById(req.params.id,(err,result)=>{
           if(err) res.status(500).json(err)
           else{
                let addLike = {
                    likes : result.likes+1
                }
               Picture.findByIdAndUpdate(result.id, addLike,(err,result)=>{
                    res.json(result)
               })
           }
       })

    },

    editPic:(req,res,next)=>{
        let updateImage ={
            description:req.body.description,
            category : req.body.category,
            pic_url:req.file.cloudStoragePublicUrl
        }

        Picture.findByIdAndUpdate(req.params.id,updateImage,(err,result)=>{
            if(err)res.status(500).json(error)
            else{
                res.status(500).json({message : 'Image data updated'})
            }
        })
    }
}