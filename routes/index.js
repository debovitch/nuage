var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile(path.resolve(__dirname + '/../public/nuage-sender.html'));
});

module.exports = router;
