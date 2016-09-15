/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');

var User = db.model('user');
var Men = db.model('man');
var Tears = db.model('tear');
var Cart = db.model('cart');

var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

var seedMen = function () {

    var men = [
        {
            name: 'Bill',
            bio: 'Bills likes to cry.'
        },
        {
            name: 'Obama',
            bio: 'POTUS'
        },
        {
            name: 'Ben',
            bio: 'Might be a dog. Woof!'
        }
    ];

    var creatingMen = men.map(function (userObj) {
        return Men.create(userObj);
    });

    return Promise.all(creatingMen);

};

var seedTears = function () {

    var tears = [
        {
            title: 'Tears1',
            state: 'sad',
            organic: '',
            amount_left: 2,
            price: 2,
            size: 1
        },
        {
            title: 'Tears2',
            state: 'happy',
            organic: '',
            amount_left: 223,
            price: 12,
            size: 551
        },
        {
            title: 'Tears3',
            state: 'angry',
            organic: '',
            amount_left: 4,
            price: 21,
            size: 7
        }
    ];

    var creatingTears = tears.map(function (userObj) {
        return Tears.create(userObj);
    });

    return Promise.all(creatingTears);

};

var seedCart = function () {

    var cart = [
        {
            items: {tears:
                {id: 1,
                 title: 'Tears1',
                 amount: 1},

                total: '5'
            }
        },
        {
            items: {tears:
                {id: 2,
                 title: 'Tears1',
                 amount: 4},

                total: '10'
            }
        },
        {
            items: {tears: {},
                total: '0'
            }
        }
    ];

    var creatingCarts = cart.map(function (userObj) {
        return Cart.create(userObj);
    });

    return Promise.all(creatingCarts);

};


db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function(){
        return seedMen();
    })
    .then(function(){
        return seedTears();
    })
    .then (function(){
        return seedCart();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
