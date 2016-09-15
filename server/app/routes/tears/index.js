'use strict'
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
let db = require('../../../db');
let Tear = db.model('tear');

router.get('/', function(request, response, next){
    Tear.findAll()
    .then(function(tears){
        response.json(tears);
    })
    .catch(next);
});

router.param('id', function(request, response, next, id){
    Tear.findById(id)
        .then(function(tear) {
            if (!tear) response.status(404).send();
            request.tearById = tear;
            next();
        })
        .catch(next);
});

router.get('/:id', function(request, response, next){
   response.send(request.tearById);
});

//NEED TO FIGURE OUT QUERY STRING PARAMS FOR THIS!!!!

// router.get('/', function(request, response, next){
//     Tear.findAll({where: {state: request.params.state}})
//     .then(function(tears){
//         if (!tears) response.status(404).end();
//         response.json(tears);
//     })
//     .catch(next);
// });

// router.get('/:organic', function(request, response, next){
//     Tear.findAll({where: {organic: request.params.state}})
//     .then(function(tears){
//         if (!tears) response.status(404).end();
//         response.json(tears);
//     })
//     .catch(next);
// });
