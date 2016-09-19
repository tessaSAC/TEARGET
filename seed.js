/* global require process console */
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
var Review = db.model('review');

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
        },
        {
            email: 'rachel@rachel.com',
            password: 'rachel',
            isAdmin: true
        },
        {
            email: 'tester@tster.com',
            password: 'tester',
            isAdmin: false
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
            name: 'Nick',
            bio: 'Nick likes to cry.',
            pictureUrl: 'https://www.placecage.com/g/155/300'
        },
        {
            name: 'Obama',
            bio: 'POTUS',
            pictureUrl: 'http://ifreestockphotos.com/wp-content/uploads/2016/05/barack-obama-free-stock-photos-768x960.jpg'
        },
        {
            name: 'Ben',
            bio: 'Might be a dog. Woof!',
            pictureUrl: 'https://thumbs.dreamstime.com/x/man-dog-park-central-asian-shepherd-walk-keeps-leash-35341989.jpg'
        },
        {
            name: 'Steven',
            bio: 'Tall, enjoys sappy movies and cutting onions.',
            pictureUrl: 'http://www.stevensegallery.com/g/140/100'
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
            organic: false,
            amount_left: 2,
            price: 2,
            size: 1,
            manId: 2
        },
        {
            title: 'Tears2',
            state: 'happy',
            organic: true,
            amount_left: 223,
            price: 12,
            size: 551,
            manId: 3
        },
        {
            title: 'Tears3',
            state: 'angry',
            organic: true,
            amount_left: 4,
            price: 21,
            size: 7,
            manId: 1
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
            array: [1, 2, 3],
            is_open: true,
            userId: 4
        },
        {
            array: [2, 2, 3],
            is_open: false,
            userId: 3
        },
        {
            array: [4, 2, 1],
            is_open: true,
            userId: 1
        }
    ];

    var creatingCarts = cart.map(function (userObj) {
        return Cart.create(userObj);
    });

    return Promise.all(creatingCarts);

};

var seedReview = function(){

    var review = [
        {
            rating: 4,
            text: "Nick's tears were amazing, they were super clear and smelled nice and salty.",
            date: new Date,
            tearId: 3,
            userId: 4
        }
    ]
    var creatingReviews = review.map(function (createReview){
        return Review.create(createReview);
    });

    return Promise.all(creatingReviews);
}


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
    .then(function(){
        return seedCart();
    })
    .then(function(){
        return seedReview();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
