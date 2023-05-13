var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Una web de prueba con Express' });
});

module.exports = router;
