'use strict';
var chalk = require('chalk');
var db = require('./db');

// HTTPS Server Stuff:
const https = require('https'),
	  fs = require('fs'),
	  secureConfig = {
	  	key: fs.readFileSync(__dirname + '/key.pem'),
	  	cert: fs.readFileSync(__dirname + '/cert.pem')
	  };

// Create a node server instance! cOoL!
// var server = require('http').createServer();

const PORT = process.env.PORT || 1337;

const server = require('https').createServer(secureConfig).listen(PORT, function(err) {
	if (err) throw err;
	db.sync()
	.then(createApplication)
	.catch(function(err) {
		console.error(chalk.red(err.stack));
	});
});

const createApplication = function() {
	const app = require('./app')(db);
	server.on('request', app);  // Attach the Express application
	require('./io')(server);  // Attach socket.io
	console.log('made app');
}