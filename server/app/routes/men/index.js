'use strict'
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
let db = require('../../../db/_db.js')
let Men = db.model('men');
let Tear = db.model('tear');

router.get('/', function(res, req, next){
    Men.findAll()
    .then(function(men){
        res.json(men);
    })
    .catch(next);
});

router.get('/:id', function(res, req, next){
    Men.findOne({ where: {id: req.params.id}})
    .then(function(man){
        if (!man) res.status(404).end();
        res.json(man);
    })
    .catch(next);
});

router.get('/:id/tears', function(res, req, next){
    Tear.findAll({where: {manId: req.params.id}})
    .then(function(tears){
        if (!tears) res.status(404).end();
        res.json(tears);
    })
});
