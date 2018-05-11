const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Picture = require('../models/picture')


module.exports = {
  findByEmail(req, res, next) {
    let token = req.body.token
    let user = jwt.verify(token, 'secret')
    let email = user.email

    User
      .findOne()
      .where('email').equals(email)
      .then(user => {
        // console.log(user)
        res.locals.user_id = user.id
        next()
      })
    .catch(err => {
      // console.log(err)
      return res.status(400).json({err})
    })
  },

  findPictureByUserId(req, res, next) {
    let userId = res.locals.user_id
    console.log(userId)
    Picture
      .find()
      .where('user_id').equals(userId)
      .then(result => {
        res.send(result)
      })
    .catch(err => {
      res.send(err)
    })
  }  
}