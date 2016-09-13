'use strict'
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
let db = require('../../../db/_db.js');
let Tear = require('../../../db/models/tears.js');

router.get('/', function(request, response, next){
    Tear.findAll()
    .then(function(tears){
        response.json(tears);
    })
    .catch(next);
});

router.get('/:id', function(request, response, next){
    Tear.findOne({where: {id: request.params.id}})
    .then(function(tear){
        if (!tear) response.status(404).end();
        response.json(tear);
    })
    .catch(next);
});

router.get('/:state', function(request, response, next){
    Tear.findAll({where: {state: request.params.state}})
    .then(function(tears){
        if (!tears) response.status(404).end();
        response.json(tears);
    })
    .catch(next);
});

router.get('/:organic', function(request, response, next){
    Tear.findAll({where: {organic: request.params.state}})
    .then(function(tears){
        if (!tears) response.status(404).end();
        response.json(tears);
    })
    .catch(next);
});
