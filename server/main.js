'use strict';

// commands to create key.pem, cert.pem:
// openssl genrsa -out key.pem 2048
// openssl req -x509 -new -nodes -key key.pem -days 1024 -out cert.pem

const chalk = require('chalk'),
	  db = require('./db');

// HTTPS Server Stuff:
const https = require('https'),
	  fs = require('fs'),
	  PORT = process.env.PORT || 1337,
	  secureConfig = {
	  	key: fs.readFileSync(__dirname + '/../key.pem'),
	  	cert: fs.readFileSync(__dirname + '/../cert.pem')
	  },
	  app = require('./app')(db);


const server = https.createServer(secureConfig).listen(PORT, function(err) {
	console.log(chalk.green('HTTPS server started on port'), chalk.magenta(PORT));
	if (err) throw err;
	db.sync()
	.then(createApplication)
	.catch(function(err) {
		console.error(chalk.red(err.stack));
	});
});

const createApplication = function() {
	server.on('request', app)  // Attach the Express application
	require('./io')(server);  // Attach socket.io
	console.log('Made app!');
}