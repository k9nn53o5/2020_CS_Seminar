var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainPage', { message: 'Are you a customer or Restaurant owner' });
});

module.exports = router;