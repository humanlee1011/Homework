// author: 15331169 lixiaoyun
// hw: week9 sign in

var requestHandles = require('./requestHandles');
var handles = {
	'/': requestHandles.pageSignIn,
	'/detail.html': requestHandles.getStaticFile,
	'/js/detail.js': requestHandles.getStaticFile,
	'/css/index.css': requestHandles.getStaticFile,
	'/js/index.js': requestHandles.getStaticFile,
	'/images/Fall.jpg': requestHandles.getStaticFile,
	'/images/id.png': requestHandles.getStaticFile,
	'/images/mail.png': requestHandles.getStaticFile,
	'/images/phone.png': requestHandles.getStaticFile,
	'/images/username.png': requestHandles.getStaticFile,
	'/js/jquery.js': requestHandles.getStaticFile
}

function route(pathname, response, postData) {
	if (typeof handles[pathname] == 'function') {
		console.log("About a route to " + pathname);
		handles[pathname](response, pathname);
	}
	else {
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.end("404 Page not Found");
	}
}
exports.route = route;