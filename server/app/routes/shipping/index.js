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
    Shipping.create(request.data)
    .then(function(address){
        if (address) response.sendStatus(201)
    })
    .catch(next);
});

	

module.exports = router;