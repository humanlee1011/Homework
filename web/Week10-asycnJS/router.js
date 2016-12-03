// author: lixiaoyun 15331169
// hw: week 10 async js
var requestHandlers = require('./requestHandlers');
var handle = {
	'/S1/index.html': requestHandlers.getStaticFile,
	'/S2/index.html': requestHandlers.getStaticFile,
	'/S3/index.html': requestHandlers.getStaticFile,
	'/S4/index.html': requestHandlers.getStaticFile,
	'/S5/index.html': requestHandlers.getStaticFile,
	'/S1/style.css': requestHandlers.getStaticFile,
	'/S2/style.css': requestHandlers.getStaticFile,
	'/S3/style.css': requestHandlers.getStaticFile,
	'/S4/style.css': requestHandlers.getStaticFile,
	'/S5/style.css': requestHandlers.getStaticFile,
	'/S1/index.js': requestHandlers.getStaticFile,
	'/S2/index.js': requestHandlers.getStaticFile,
	'/S3/index.js': requestHandlers.getStaticFile,
	'/S4/index.js': requestHandlers.getStaticFile,
	'/S5/index.js': requestHandlers.getStaticFile,
	'/images/favicon.png': requestHandlers.getStaticFile,
	'/images/atplus_white.png': requestHandlers.getStaticFile,
	'/images/atplus_green.png': requestHandlers.getStaticFile,
	'/upload': requestHandlers.responseRandomNumber
}

function route(res, pathname) {
	if (typeof handle[pathname] == 'function') {
		console.log("About a route to " + pathname);
		handle[pathname](res, pathname);
	}
	else if (pathname.match(/upload/)) {
		console.log("About a route to " + pathname);
		handle['/upload'](res, pathname);
	}
	else {
		console.log("There's no route to " + pathname);
	}
}

exports.route = route;