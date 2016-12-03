// author: 15331169 lixiaoyun
// hw: week9 sign in

var router = require('./router');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');

function pageSignIn(response) {
	response.writeHead(200, {"Content-Type": "text/html"});
	fs.readFile(__dirname + '/index.html', 'utf-8', function(err, data) {
		if (err)
			throw err;
		else {
			response.write(data);
			response.end();
		}
	});
}

function getStaticFile(response, pathname) {
	switch(path.extname(pathname)){
		case ".html":
            response.writeHead(200, {"Content-Type": "text/html"});
            break;
        case ".js":
            response.writeHead(200, {"Content-Type": "text/javascript"});
            break;
        case ".css":
            response.writeHead(200, {"Content-Type": "text/css"});
            break;
        case ".jpg": 
            response.writeHead(200, {"Content-Type": "image/jpeg"});
            break;
        case ".png":
            response.writeHead(200, {"Content-Type": "image/png"});
            break;
        default:
            response.writeHead(200, {"Content-Type": "application/octet-stream"});
    }
    fs.readFile(__dirname + pathname, function(err, data) {
		if (err)
			throw err;
		else {
			response.write(data);
			response.end();
		}
	});
}

function showDetails(response, postData) {
	console.log(postData);
	response.writeHead(200, {"Content-Type": "text/json"});
	response.end(postData);
}

function uploadData(response, postData) {
	userInfo = [postData.username, postData.idNumber, postData.phoneNumber, postData.mail];
	fs.readFile('user.json', 'utf-8', function(err, data) {
		if (err)
			throw err;
		else {
			var repeat = [];
			var keys = ['username', 'idNumber', 'phoneNumber', 'mail'];
			console.log("Data" + JSON.stringify(data));
			userInfo.forEach(function(value, index) {
				var str = "\"" + keys[index] + "\":\"" + userInfo[index] + "\"";
				if (data.toString().indexOf(str) != -1) {//有重复
					repeat.push(keys[index]);
				}
			});
			if (repeat.length) {
				console.log(repeat.length);
				response.writeHead(200, {"Content-Type": "application/x-www-form-urlencoded"});
				response.write(repeat.toString());
				response.end();
			}
			else {
				addUser(postData);
				var redirect = "?username=" + postData.username;
				response.writeHead(200, {"Content-Type": "application/x-www-form-urlencoded"});
				response.end(redirect);
				// response.writeHead(302, {"Location": "/?username=" + postData.username});
				// response.end();
			}
		}
	});
} 

function addUser(postData) {
	fs.appendFile('user.json', JSON.stringify(postData), 'utf-8', function(err) {
		if (err)
			throw err;
		console.log("Save successfully");
	});
}

function queryUser(username, request, response) {
	var userInfo = {};
	fs.readFile('user.json', 'utf-8', function(err, data) {
		if (err)
			throw err;
		else {
			var query = new RegExp("\{\"username\":\"" + username + "\"[@,\.\":\\w\\d]*\}");
			userInfo = query.exec(data.toString());
			if (request.method == 'GET') {
				if (userInfo)
					router.route('/detail.html', response);
				else {
					response.writeHead(302, {"Location": "/"});
					response.end();
				}
			}
			else {
				if (userInfo)
					showDetails(response, userInfo[0]);
				else {
					router.route('/', response);
				}
			}
		}
	});
}

exports.pageSignIn = pageSignIn;
exports.getStaticFile = getStaticFile;
exports.showDetails = showDetails;
exports.uploadData = uploadData;
exports.queryUser = queryUser;