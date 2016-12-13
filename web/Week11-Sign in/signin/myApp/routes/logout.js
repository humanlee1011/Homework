var express = require('express');
var Handler = require('../controllers/handler');
var router = express.Router();


router.get('/', function(req, res, next) {
  Handler.logOut(req, res);
});

module.exports = router;