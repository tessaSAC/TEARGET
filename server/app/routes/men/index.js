'use strict'
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
let db = require('../../../db')
let Man = db.model('man')
let Tear = db.model('tear')

router.get('/', function(request, response, next){
    Man.findAll()
    .then(function(men){
        response.json(men);
    })
    .catch(next);
});

router.param('id', function (request, response, next, id){
    Man.findById(id, {include: [
        {model: Tear}
        ]
    })
        .then(function (man){
            if (!man) response.status(404).send();
            request.manById = man;
            next();
        })
        .catch(next);
})

router.get('/:id', function(request, response, next){
    response.send(request.manById)
});

router.get('/:id/tears', function(request, response, next){
    Tear.findAll({
        where: {manId: request.params.id},
        include: [
            {model: Man}
        ]
})
    .then(function(tears){
        if (!tears) response.status(404).end();
        response.json(tears);
    })
    .catch(next);
});

router.delete('/:id', function(request, response, next){
    Man.destroy({
        where: {
            id: request.params.id
        }
    })
    .then(function(){
        response.sendStatus(200)
    })
    .catch(next)
})