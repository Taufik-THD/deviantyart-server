
var express = require('express');
var router = express.Router();
const multer = require('multer');
const { addImage } = require('../controllers/image_controller');
const { sendUploadToGCS } = require('../middlewares/uploadGcs');
const upload = multer({
 storage  : multer.memoryStorage(),
 limits   : {
   fileSize: 10*1024*1024
   }
})

const {
  register
} = require('../controllers/index-controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/image', upload.single('item'), sendUploadToGCS, addImage)

// POST
router.post('/register', register)

module.exports = router;
