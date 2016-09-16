'use strict'
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
let db = require('../../../db');
let Tear = db.model('tear');
let Man = db.model('man');

// api/tears
// api/tears/?state=sad

router.get('/', function(request, response, next){
    var reqState = request.query.state;
    var reqOrganic = request.query.organic;
    if (reqState){
        return Tear.findAll( {
            where: {state: reqState},
            include: [
                {model: Man}
            ]
        })
        .then(function(tears){
            if (tears.length === 0){
                response.status(404).send();
            }
            response.json(tears)
        });
    }
    if (reqOrganic){
        return Tear.findAll({
            where: {organic: reqOrganic},
            include: [
                {model: Man}
            ]
    })
        .then(function(tears){
            if (tears.length === 0) {
                response.status(404).send();
            }
            response.json(tears)
        });
    }
    return Tear.findAll({ include: [
        {model: Man}
    ]})
    .then(function(tears){
        response.json(tears);
    })
    .catch(next);
});

router.param('id', function(request, response, next, id){
    Tear.findById(id, { include: [
        {model: Man}
    ]})
        .then(function(tear) {
            console.log('IN ID', tear)
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

// router.get('/:state', function(request, response, next){
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
