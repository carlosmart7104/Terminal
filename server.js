var express = require('express');
var server = express();
server.use('/', express.static(__dirname + '/'));
server.listen(8080, function () {
	console.log("Corriendo servidor en localhost:8080");
});