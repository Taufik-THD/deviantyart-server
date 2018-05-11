const express = require('express')
const router = express.Router()

const {
  findByEmail,
  findPictureByUserId
} = require('../controllers/user-controller')

router.post('/images', findByEmail, findPictureByUserId)



module.exports = router