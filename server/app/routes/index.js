'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
// var session = require('express-session');
// var bodyParser = require('body-parser');
module.exports = router;

//THESE are already defined & used for us in the parsing-middleware.js

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

router.use('/tears', require('./tears'));
router.use('/men', require('./men'));
router.use('/cart', require('./cart'));
router.use('/user', require('./user'));
router.use('/shipping', require('./shipping'))

// Make sure this is after all of
// the registered routes!
router.use(function (request, response) {
    response.status(404).end();
});
