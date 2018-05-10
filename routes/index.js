const express = require('express');
const router = express.Router();

const {
  register
} = require('../controllers/index-controller')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// POST
router.post('/register', register)

module.exports = router;
