const mongoose = require("mongoose")

const Schema = mongoose.Schema

const pictureSchema = new Schema({
    // {type:Schema.Types.ObjectId, ref:'User'}
    user_id:String,
    description:String,
    category : String,
    pic_url:String
})

const Picture = mongoose.model("picture",pictureSchema)


module.exports=Picture

