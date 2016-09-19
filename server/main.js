'use strict';
var chalk = require('chalk');
var db = require('./db');

// HTTPS Server Stuff:
const https = require('https'),
	  fs = require('fs'),
	  secureConfig = {
	  	key: fs.readFileSync(__dirname + '/../key.pem'),
	  	cert: fs.readFileSync(__dirname + '/../cert.pem')
	  };

// Create a node server instance! cOoL!
// var server = require('http').createServer();

var createApplication = function () {
    var app = require('./app')(db);

    // HTTPS Server Stuff:
    const PORT = process.env.PORT || 1337;
    const server = https.createServer(secureConfig, app).listen(PORT, function() {
    	console.log(chalk.green('HTTPS server started on port'), chalk.magenta(PORT));
    });

    server.on('request', app); // Attach the Express application.
    require('./io')(server);   // Attach socket.io.
};

// var startServer = function () {

//     var PORT = process.env.PORT || 1337;

//     server.listen(PORT, function () {
//         console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
//     });

// };

db.sync()
.then(createApplication)
// .then(startServer)
.catch(function (err) {
    console.error(chalk.red(err.stack));
});
