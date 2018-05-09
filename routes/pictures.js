const express = require('express');
const router = express.Router();
const {
  upload,
  deletePic,
  editPic,
  getAllpictures,
  getPicturesById,
  getPicturesByCategory,
} = require ('../controllers/picture-controller')
const images = require('../helpers/uploadpic')
const deleteImage = require('../helpers/deletepic')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET main endpoint. */

router.post('/upload',images.multer.single('image'),images.sendUploadToGCS,upload)
router.delete('/delete/:id',deletePic)
router.put('/edit/:id',images.multer.single('image'),images.sendUploadToGCS,editPic)
router.get('/',getAllpictures)
router.get('/:id',getPicturesById)
router.get('/:category',getPicturesByCategory)


module.exports = router;
