const db = require('../../../server/db');
const Sequelize = require('sequelize');
//require('../../../server/db/models/tears.js');
const expect = require('chai').expect;
const supertest = require('supertest');
const fs = require('fs');

describe('Men Route', function(){
    let app, Men, agent, man, Tears, tear ;

    let menInfo = {
        name: 'Abe',
        bio: 'Born in log cabin, enjoys theater.'
    };

    let tearInfo = {
        title: 'Tear 1',
        state: 'sad',
        organic: 'true',
        amount_left: 6,
        size: 4,
        price: 18
    };

    beforeEach('Sync DB', function(){
        return db.db.sync({force: true});
    });

    beforeEach('Create app and agent', function () {
        app = require('../../../server/app')(db.db);
        Men = db.Men;
        Tears = db.Tears;
        agent = supertest.agent(app);
    });

        beforeEach('Create a tear', function(done) {
        return Tears.create(tearInfo).then(function(createdTear){
        
            tear = createdTear;
            done();
            }).catch(done);
            
    });

        beforeEach('Create a man', function(done) {
        return Men.create(menInfo).then(function(createdMan){
            
            return createdMan.addTear(tear);
        })
        .then(function(createdMan){
            man = createdMan;
            done();
        }).catch(done);
        
    })

        

    
    it('should get back a JSON of all Men in database', function (done){
        agent.get('/api/men').expect(200).end(function(err, response){
            if (err) return done(err);
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.length(1);
            done();
        });
    });
    it('should get back a man by id', function (done){
        agent.get('/api/men/' + man.id).expect(200).end(function(err, response){
            if (err) return done(err);
            
            expect(response.body.name).to.equal(man.name)
            done();
        });
    });
    it('should get back an array of tears belonging to specified Man ', function(done){
        agent.get('/api/men/' + man.id + '/tears').expect(200).end(function(err, response){
            if (err) return done(err);
            console.log(response.body);
            expect(response.body.id).to.equal(tear.id);
            done();
        });
    });
})