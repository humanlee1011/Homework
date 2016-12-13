var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/myApp';

function saveUser(userInfo, callback) {
  var insertUser = function(userInfo, db, callback) {
    db.collection('users').insert(userInfo, function(err, result) {
      if (err) {
        console.log('Error:' + err);
        return;
      }
      callback(result);
    });
  };
  MongoClient.connect(url, function(err, db) {
    console.log("Connected correctly to server.");
    insertUser(userInfo, db, function(result) {
      //console.log(result);
      callback(result);
      db.close();
    })
  });
}

function queryUser(username, callback) {
  var findUser = function(db, callback) {
    var users = db.collection('users').find({username: username});
    users.toArray(function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      //console.log(result);
      callback(result);
    });
  }

  MongoClient.connect(url, function(err, db) {
    console.log("Connected correctly to server.");
    findUser(db, function(result) {
      callback(result);
      db.close();
    });
  });
}

function findDuplicate(userInfo, callback) {
  var findUser = function(db, callback) {
    var users = db.collection('users');
    var map = ['username', 'studentId', 'phone', 'mail'];
    var duplicate = [];
    //与已有的user info进行比对
    /////用promise来优雅地解决此处数据库查找地异步问题
    function find(ele) {
      return new Promise(function(resolve, reject) {
        console.log({[ele]:userInfo[ele]});
        users.find({[ele]: userInfo[ele]}).toArray(function(err, result) {
          if (err) {
            console.log(err);
          }
          else if (result.length) {
            duplicate.push(ele);
            console.log('#' + ele);
          }
          resolve();
        });
      });
    }

    Promise.all([find('username'), find('studentId'), find('phone'), find('mail')]).then(function() {
      callback(duplicate);
    });
  }

  MongoClient.connect(url, function(err, db) {
    console.log("Connected correctly to server.");
    findUser(db, function(result) {
      //console.log(result);
      callback(result);
      db.close();
    });
  });
}

exports.saveUser = saveUser;
exports.queryUser = queryUser;
exports.findDuplicate = findDuplicate;


