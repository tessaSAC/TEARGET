'use strict'
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
let db = require('../../../db');
let Shipping = db.model('shipping')

router.get('/', function(request, response, next){
    Shipping.findAll()
    .then(function(addresses){
        response.json(addresses);
    })
    .catch(next)
});

router.post('/', function(request, response, next) {
    console.log("THIS IS THE POST REQUEST", request);
    Shipping.create(request.body)
    .then(function(address){
        if (address) response.sendStatus(201)
    })
    .catch(next);
});

	

module.exports = router;