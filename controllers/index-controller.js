const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
// require('dotenv').config()

const jwtSecret = process.env.JWT_SECRET

module.exports = {
  register(req, res, next) {
    const {
      name,
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
            name,
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
    const {
      email,
      password
    } = req.body
    
    User
      .findOne()
      .where('email').equals(email.toLowerCase())
      .then(result => {
        if (!result) {
          return res.status(400).json({
            message: 'please check your email'
          })
        }
        let isMatch = bcrypt.compareSync(password, result.password)
        if(!isMatch) {
          return res.status(400).json({
            message: 'password do not match'
          })
        }

        // Remove password key
        delete result._doc.password;

        res.locals.user = result
        next()
      })
    .catch(({message}) => res.status(500).json({ message }))
  },

  generateToken(req, res, next) {
    let user = res.locals.user
    let token = jwt.sign({user}, jwtSecret)
    res.status(200).json({token})
  },

  auth(req, res, next) {
    let jwtSecret = process.env.JWT_SECRET
    let token = req.body.token
    jwt.verify(token, jwtSecret, decode)
    function decode(err, result) {
      if(err) {
        console.log(err.message)
        return res.status(401).json({
          message: 'please login first'
        })
      }
      // console.log('------', result)
    }
    next()
  }
}