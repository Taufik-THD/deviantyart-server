const mongoose = require("mongoose")

const Schema = mongoose.Schema

const pictureSchema = new Schema({
  // {type:Schema.Types.ObjectId, ref:'User'}
  user_id:String,
  picture_name:String,
  description:String,
  likes: 0,
  pic_url:String
})

const Picture = mongoose.model("picture", pictureSchema)

module.exports=Picture
