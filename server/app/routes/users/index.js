'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const bodyParser = require('body-parser');
module.exports = router;
const _ = require('lodash');

const ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end(); // Else assign temp id
    }
};


// BODY PARSER:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// CART STUFF:
// Puts userId from req params on body so cart router can grab it:
router.param('userId', function (request, response, next, id) {
	request.body.userId = parseInt(id, 10);
	next();
})

app.use ('/users/cartRouter', cart);