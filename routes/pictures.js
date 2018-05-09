const express = require('express');
const router = express.Router();
const images = require('../helpers/uploadpic')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET main endpoint. */
router.get('/', (req, res, next) => {
  res.send({ message: 'Welcome Buddy!' })
})


router.post('/upload',
  images.multer.single('image'), 
  images.sendUploadToGCS,
  (req, res) => {
    res.send({
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })


module.exports = router;
