'use strict'
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
let db = require('../../../db/_db.js');
let Tear = db.model('tear');

router.get('/', function(req, res, next){
    Tear.findAll()
    .then(function(tears){
        res.json(tears);
    })
    .catch(next);
});

router.get('/:id', function(req, res, next){
    Tear.findOne({where: {id: req.params.id}})
    .then(function(tear){
        if (!tear) res.status(404).end();
        res.json(tear);
    })
    .catch(next);
});

router.get('/:state', function(req, res, next){
    Tear.findAll({where: {state: req.params.state}})
    .then(function(tears){
        if (!tears) res.status(404).end();
        res.json(tears);
    })
    .catch(next);
});

router.get('/:organic', function(req, res, next){
    Tear.findAll({where: {organic: req.params.state}})
    .then(function(tears){
        if (!tears) res.status(404).end();
        res.json(tears);
    })
    .catch(next);
});
