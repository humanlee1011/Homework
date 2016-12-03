// author: 15331169 lixiaoyun
// hw: week9 sign up

var router = require('./router'),
	requestHandles = require('./requestHandles'),
	http = require('http'),
	url = require('url'),
	path = require('path'),
	querystring = require('querystring');

function start() {
	function onRequest(request, response) {
		var query = url.parse(request.url).query;//"query=string"
		var pathname = url.parse(request.url).pathname;
		//如果是查询页面
		if (request.method == "GET") {
			console.log("Request for " + pathname + " received");
			if (!query)
				router.route(pathname, response);
			else //通过username的URL查询
				requestHandles.queryUser(querystring.parse(query).username, request, response);			
		}
		else {
			if (!query) {
				console.log("Request for post received");
				var postData = "";
				request.on('data', function(chunk) {
					postData += chunk;
				});
				request.on('end', function(){
					requestHandles.uploadData(response, querystring.parse(postData));
				});
			}
			else {//通过username的URL查询
				requestHandles.queryUser(querystring.parse(query).username, request, response);
			}
		}		
	}
	http.createServer(onRequest).listen(8000);
	console.log("Server has started.");
}

exports.start = start;