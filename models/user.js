const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        let re = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
        return re.test(v)
      },
      message: '{VALUE} is not a valid email address'
    }
  },
  password: {
    type: String,
    minlength: [6, 'Password must consist 6 - 12 characters'],
    maxlength: [12, 'Password must consist 6 - 12 characters']
  },
  images: [{
    type: Schema.Types.ObjectId, ref: 'picture'
  }]
})

const User = mongoose.model('User', userSchema)

module.exports = User