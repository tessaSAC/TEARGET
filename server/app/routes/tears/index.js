'use strict'
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
let db = require('../../../db');
let Tear = db.model('tear');
let Man = db.model('man');
let Review = db.model('review');


router.post('/:id/reviews/', function(request, response, next){

    request.body.tearId = request.params.id;
    Review.create(request.body)
    .then(function(review){
        response.status(200).send(review);
    });

})

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
        {model: Man},
        {model: Review}
    ]})
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

router.delete('/:id', function(request, response, next){
    Tear.destroy({
        where: {
            id: request.params.id
        }
    })
    .then(function(){
        response.sendStatus(200)
    })
    .catch(next)
})


