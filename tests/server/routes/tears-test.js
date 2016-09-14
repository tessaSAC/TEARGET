// Instantiate all models
const db = require('../../../server/db');
const Sequelize = require('sequelize');
const expect = require('chai').expect;
const supertest = require('supertest');
const fs = require('fs');

describe('Tear Route', function(){
    let app, Tear, agent, tear;

    let tearInfo = {
        title: 'Tear 1',
        state: 'sad',
        organic: true,
        amount_left: 6,
        size: 4,
        price: 18
    };

    beforeEach('Sync DB', function(){
        return db.sync({force: true});
    });

    beforeEach('Create app and agent', function () {
        app = require('../../../server/app')(db);
        Tear = db.model('tear');
        agent = supertest.agent(app);
    });

    beforeEach('Create a tear', function(done) {
        return Tear.create(tearInfo).then(function(createdTear){
            tear = createdTear;
            done();
        }).catch(done);
    })

    it('should get back a JSON of all Tears in database', function (done){
        agent.get('/api/tears').expect(200).end(function(err, response){
            if (err) return done(err);
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.length(1);
            done();
        });
    });

    it('should get back a JSON of a tear by id', function (done){
        agent.get('/api/tears/' + tear.id).expect(200).end(function(err, response){
            if (err) return done(err);
            expect(response.body.title).to.equal(tear.title)
            done();
        });
    });
});
