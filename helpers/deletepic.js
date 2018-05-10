require('dotenv').config()

const Storage = require('@google-cloud/storage')
const CLOUD_BUCKET = process.env.CLOUD_BUCKET
const storage = Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})

const bucket = storage.bucket(CLOUD_BUCKET)


const deletePicGCS= (req, res, next) => {
    if (!req.file) {
      return next()
    }
  
    const gcsname = Date.now() + req.file.originalname
    const file = bucket.file(gcsname)
    
    file.delete((err,res)=>{
        if(err) console.log(err)
        else{
            console.log('delete suceed')
        }
    })
  
}

module.exports=deletePicGCS