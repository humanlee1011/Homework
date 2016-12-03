// author: lixiaoyun 15331169
// hw: week 10 async js
var http = require('http'),
	path = require('path'),
	url = require('url'),
	router = require('./router'),
	port = 3000;

http.createServer(function(req, res) {
	var pathname = url.parse(req.url).pathname;
	console.log("Request for " + req.url + " is received");
	router.route(res, pathname);
}).listen(port, function() {
	console.log('server is listenning on ' + port);
});

