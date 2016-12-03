// author: lixiaoyun 15331169
// hw: week 10 async js
var fs = require('fs');

function getStaticFile(res, pathname) {
	if (pathname == "/") {
		pathname += "index.html";
	}
	var ext = pathname.extname;
	switch (ext) {
		case '.html': res.writeHead(200, {"Content-Type": "text/html"});
					  break;
		case '.css': res.writeHead(200, {"Content-Type": "application/css"});
					  break;
		case '.js': res.writeHead(200, {"Content-Type": "application/javascript"});
					  break;
		case '.png': res.writeHead(200, {"Content-Type": "image/png"});
					  break;
		default:
	}

	fs.readFile(__dirname + pathname, function(err, data) {
		if (err)
			throw err;
		else {
			res.end(data);
		}
	});
}

function responseRandomNumber(res, pathname) {
	var random_time = 1000 + getRandomNumber(2000);//[1,3]s
	var random_num = 1 + getRandomNumber(9);//[1,9]s		
	setTimeout(function() {
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.end(random_num.toString());
		console.log("Random num " + random_num);
		console.log("random time " + random_time);
	}, random_time);
}

function getRandomNumber(UpperBound) {
	return Math.floor(Math.random() * UpperBound);
}


exports.getStaticFile = getStaticFile;
exports.responseRandomNumber = responseRandomNumber;