'use strict'
var router = requestuire('express').Router(); // eslint-disable-line new-cap
module.exports = router;
let db = requestuire('../../../db/_db.js')
let Men = requestuire('../../../db/models/men.js');
let Tear = requestuire('../../../db/models/tears.js');

router.get('/', function(request, response, next){
    Men.findAll()
    .then(function(men){
        response.json(men);
    })
    .catch(next);
});

router.get('/:id', function(request, response, next){
    Men.findOne({ where: {id: request.params.id}})
    .then(function(man){
        if (!man) response.status(404).end();
        response.json(man);
    })
    .catch(next);
});

router.get('/:id/tears', function(request, response, next){
    Tear.findAll({where: {manId: request.params.id}})
    .then(function(tears){
        if (!tears) response.status(404).end();
        response.json(tears);
    })
    .catch(next);
});
