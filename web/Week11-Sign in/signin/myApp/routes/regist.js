var express = require('express');
var Handler = require('../controllers/handler');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('regist', { title: 'Sign Up' });
});

router.post('/', function(req, res, next) {
  //检查数据是否重复
  Handler.checkIfRepeat(req, res, next);
});

router.post('/', function(req, res, next) {
  Handler.saveUser(req, res);
});

module.exports = router;