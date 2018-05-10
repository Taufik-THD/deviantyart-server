const User = require('../models/user.js')

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
  }
}