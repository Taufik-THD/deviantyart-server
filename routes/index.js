var express = require('express');
var router = express.Router();
const multer = require('multer');
const { addImage, getImage } = require('../controllers/image_controller');
const { sendUploadToGCS } = require('../middlewares/uploadGcs');
const upload = multer({
 storage  : multer.memoryStorage(),
 limits   : {
   fileSize: 10*1024*1024
   }
})

const {
  register,
  login,
  generateToken
} = require('../controllers/index-controller')

/* GET home page. */
router.get('/', getImage);

router.post('/image', upload.single('item'), sendUploadToGCS, addImage)

// POST
router.post('/register', register)
router.post('/login', login, generateToken)

module.exports = router;
