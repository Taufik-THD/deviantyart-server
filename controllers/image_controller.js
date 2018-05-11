const Image = require('../models/picture');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

module.exports = {

  addImage(req, res){

    const token = req.body.token

    jwt.verify(token, "secret", function (err, decoded) {

      User.find({email: decoded.email})

      .then(data => {
        const idUser = data[0]._id

        const newImage = new Image({
          user_id: idUser,
          picture_name: req.body.picture_name,
          description: req.body.description,
          pic_url: req.file.cloudStoragePublicUrl,
          likes: 0
        })

        newImage.save()

        .then(success => {
          res.status(201).json('success save image')
        })
        .catch(err => {
          res.status(400).json('failed save')
        })
      })

    })

    // const emailUser = req.body.email
    //



  },

  getImage(req, res){

    Image.find({})

    .then(data => {
      res.status(200).json({
        message: 'success get data',
        data
      })
    })
    .catch(err => {
      res.status(400).json('failed get')
    })

  }

};
