const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const jwtSecret = process.env.JWT_SECRET

module.exports = {
  register(req, res) {

    const {
      nama,
      email,
      password
    } = req.body

    User
      .findOne()
      .where('email').equals(email.toLowerCase())
      .then(result => {
        if (result) {
          return Promise.reject({
            status: 400,
            message: 'this email already exist'
          })
        }
        return User
          .create({
            nama,
            email,
            password
          })
    })
    .then(result => {
      res.status(200).json({
        message: 'user successfully created',
        data: result
      })
    })
    .catch(err => {
      let message = err.message
      if(err.status) {
        return res.status(err.status).json({message})
      }
      res.status(400).json({message})
    })
  },

  login(req, res, next) {

    const { email, password } = req.body

    User.findOne({$or: [
      {email: req.body.email},
      {username: req.body.username}
    ]}, function (err, user) {

      if (err) {
        throw err
      }

      user.comparePassword(req.body.password, function (err, isMatch) {

        if (err) {
          throw err
        }

        if (isMatch) {

          user.token = jwt.sign({id: user._id}, jwtSecret)
          req.headers.token = user.token
          res.status(200).json(user.token)

        } else {

          res.status(404).json("wrong password !")

        }

      })

    })

  }

}
