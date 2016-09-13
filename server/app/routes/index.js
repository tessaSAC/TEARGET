'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
var session = require('express-session');
var bodyParser = require('body-parser');
module.exports = router;

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

router.use('/tears', require('./tears'));
router.use('/men', require('./men'));
router.use('/cart', require('./cart'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
