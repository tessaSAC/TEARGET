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
var Shipping = db.model('shipping')

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
            is_admin: true
        },
        {
            email: 'tester@tster.com',
            password: 'tester',
            is_admin: false
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
            bio: 'Nick likes to cry for money.  His hobbies include backpacking, scuba diving and spinning yarn',
            pictureUrl: '/assets/600men/Nick600.png'
        },
        {
            name: 'Obama',
            bio: 'POTUS. Enjoys hula hooping with FLOTUS and walking Bo.',
            pictureUrl: '/assets/600men/Obama600.png'
        },
        {
            name: 'Ben',
            bio: 'Might be a dog. Woof!',
            pictureUrl: '/assets/600men/Ben600.png'
        },
        {
            name: 'Steven',
            bio: 'Tall, enjoys sappy movies, cutting onions and raising alpacas.',
            pictureUrl: '/assets/600men/Steven600.png'
        },
        {
            name: 'Roscoe',
            bio: "Roscoe loves providing tears for Tearget. Some of his favorite pastimes are cooking, football and pogs.",
            pictureUrl: "/assets/600men/Roscoe600.png"
        },
        {
            name: 'Guy',
            bio: 'Guy is a shy man who has recently begun providing tears for us.  He enjoys puppies, sailing and bow ties.',
            pictureUrl: "/assets/600men/Guy600.png"
        },
        {
            name: 'Gabe',
            bio: 'Enjoys making and pontificating upon Japanese swords. Being asked if he likes samurai makes him cry.',
            pictureUrl: '/assets/600men/Gabe600.png'
        },
        {
            name: 'Jason',
            bio: 'Jason is so passionate about teaching that he sheds tears of mirth whenever he gets a help ticket.',
            pictureUrl: '/assets/600men/Jason600.png'
        },
        {
            name: 'Wes',
            bio: 'Our most affordable tear and a great starting point for your collection. Wes cries prodigiously when he watches Korean dramas and listens to Korean pop music, which he does nightly.',
            pictureUrl: '/assets/600men/Wes600.png'
        },
        {
            name: 'Geoff',
            bio: 'Geoff is a kind and gentle giant who cries softly when he remembers we have yet to achieve world peace.',
            pictureUrl: '/assets/600men/Geoff600.png'
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
            title: 'Clexadia',
            state: 'sad',
            organic: false,
            amount_left: 2,
            price: 0.20,
            size: 1,
            manId: 2,
            pictureUrl: '/assets/600tears/tear1.png',
        },
        {
            title: 'Veoienice',
            state: 'happy',
            organic: true,
            amount_left: 223,
            price: 0.82,
            size: 551,
            manId: 3,
            pictureUrl: '/assets/600tears/tear2.png',
        },
        {
            title: 'Phireto',
            state: 'angry',
            organic: true,
            amount_left: 4,
            price: 0.21,
            size: 7,
            manId: 1,
            pictureUrl: '/assets/600tears/tear3.png',
        },
        {
            title: 'Ieadia',
            state: 'sad',
            organic: false,
            amount_left: 5,
            price: 0.32,
            size: 15,
            manId: 4,
            pictureUrl: '/assets/600tears/tear4.png',
        },
        {
            title: 'Paoypedo',
            state: 'sad',
            organic: true,
            amount_left: 10,
            price: 0.50,
            size: 10,
            manId: 1,
            pictureUrl: '/assets/600tears/tear5.png',
        },
        {
            title: 'Keormodia',
            state: 'angry',
            organic: false,
            amount_left: 8,
            price: 0.75,
            size: 50,
            manId: 3,
            pictureUrl: '/assets/600tears/tear6.png',
        },
        {
            title: 'Claepyle',
            state: 'angry',
            organic: false,
            amount_left: 4,
            price: 0.25,
            size: 5,
            manId: 6,
            pictureUrl: '/assets/600tears/tear7.png',
        },
        {
            title: 'Oekireto',
            state: 'sad',
            organic: true,
            amount_left: 2,
            price: 0.30,
            size: 6,
            manId: 5,
            pictureUrl: '/assets/600tears/tear8.png',
        },
        {
            title: 'Smaociliope',
            state: 'angry',
            organic: false,
            amount_left: 10,
            price: 0.40,
            size: 34,
            manId: 3,
            pictureUrl: '/assets/600tears/tear9.png',
        },
        {
            title: 'Tusleia',
            state: 'happy',
            organic: true,
            amount_left: 2,
            price: 0.99,
            size: 40,
            manId: 2,
            pictureUrl: '/assets/600tears/tear10.png',
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

var seedShpping = function(){
    var shipping = [
        {
            name: "Rachel Addleman",
            address: "209 West 108 Street",
            city: 'New York',
            state: 'NY',
            zip: 10025,
            userId: 3
        }
    ]
    var creatingShipping= review.map(function (createShipping){
        return Shipping.create(createShipping)
    });
    return Promise.all(creatingShipping);
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
