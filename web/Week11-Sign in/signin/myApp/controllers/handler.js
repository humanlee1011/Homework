var User = require('../models/user');
var crypto = require('crypto');

function signInHandler(req, res) {
  //检查数据是否正确
  var userInfo = req.body;
  var pwd = "";
  User.queryUser(userInfo.username, function(result) {
    console.log(result);
    //若该用户存在
    if (result.length) {
      pwd = result[0].password;
      console.log(pwd);
      var hasher = crypto.createHash('md5');
      hasher.update(userInfo.password);
      var newpwd = hasher.digest('hex');//用16进制存储
      //若正确，跳转至detail && 给一个signedCookie
      if (pwd == newpwd) {
        console.log('right');
        req.session.username = userInfo.username;
        //res.end("?username=" + userInfo.username);
        res.redirect('/?username=' + userInfo.username);
      }//若不正确，返回error消息
    }//若该用户不存在或者密码不正确
    else {
      res.render('index', {
        title: 'Sign In',
        error: 'Username or password is incorrect.'});
    }
  });
}

function checkIfRepeat(req, res, next) {
  var userInfo = req.body;
  console.log(userInfo);
  User.findDuplicate(userInfo, function(result) {
    //若重复，返回错误信息
    console.log('duplicate:' + result);
    if (result.length) {
      var errorMessage = {};
      for (var i = 0; i < result.length; i++) {
        errorMessage[result[i]] = 'Repeat';
      }
      errorMessage.title = 'Sign Up';
      console.log(errorMessage);
      res.render('regist', errorMessage);
    }
    else {
      next();
    }
  });
}

function saveUser(req, res) {
  var userInfo = req.body;
  //console.log(userInfo);
  userInfo.password = userInfo.password1;
  delete userInfo.password1;
  delete userInfo.password2;
  //加密保存至数据库，并跳转至detail && 写Cookie
  var hasher = crypto.createHash('md5');
  hasher.update(userInfo.password);
  userInfo.password = hasher.digest('hex');
  console.log(userInfo.password);
  User.saveUser(userInfo, function(result) {
    //console.log(result);
    req.session.username = userInfo.username;
    //res.end("/?username=" + userInfo.username);
    res.redirect('/?username=' + userInfo.username);
  });
}

function logOut(req, res) {
  console.log('logout');
  //清除cookie
  req.session.destroy(function(err) {
    if (err)
      console.log(err);
  });
  //重定向到登录界面
  res.redirect('/');
}

function findUser(req, res) {
  //获取username
  var username = req.query.username;
  console.log(username);
  User.queryUser(username, function(userInfo) {
    if (!userInfo.length)
      res.redirect('/');
    else {
      var message = {};
      message.userInfo = userInfo[0];
      message.title = 'User\'s Information';
      console.log(message);
      res.render('detail', message);
    }
  });
}

exports.findUser = findUser;
exports.checkIfRepeat = checkIfRepeat;
exports.saveUser = saveUser;
exports.signInHandler = signInHandler;
exports.logOut = logOut;