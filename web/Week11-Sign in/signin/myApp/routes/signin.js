var express = require('express');
var Handler = require('../controllers/handler');
var router = express.Router();
var crypto = require('crypto');


/* GET home page. */
router.get('/', function(req, res, next) {
  //如果是通过username访问
  if (req.query.username) {
    if (req.session.username) {
      //如果已登录用户尝试访问其他用户详情页面则跳转回自己的页面
      if (req.session.username != req.query.username)
        req.query.username = req.session.username;
      Handler.findUser(req, res);
    }
    else {
      res.redirect('/');
    }
  }
  //如果已经登录过，自动跳转
  else if (req.session.username) {
    res.redirect('/?username=' + req.session.username);
  }
  else {
    res.redirect('/login');
  }
});

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Sign In' });
})

//登录提交表单处理
router.post('/login', function(req, res, next) {
  Handler.signInHandler(req, res);
});

module.exports = router;
