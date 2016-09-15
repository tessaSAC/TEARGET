'use strict';
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, db) {

    var User = db.model('user');
    var Cart = db.model('cart')

    // When passport.authenticate('local') is used, this function will receive
    // the email and password to run the actual authentication logic.
    var strategyFn = function (email, password, done) {
        User.findOne({
                where: {
                    email: email
                }
            })
            .then(function (user) {
                // user.correctPassword is a method from the User schema.
                if (!user || !user.correctPassword(password)) {
                    done(null, false);
                } else {
                    // Properly authenticated.
                    done(null, user);
                }
            })
            .catch(done);
    };


    var makeUser = function(user){

        return Cart.create()
        .then(function(cart){

            return User.create(user)
            .then(function(user){

                return user.addCart(cart)
                // .then (function(user2){
                //     return user2;
                // })
            })

        })
        .catch(console.error);

    }

    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, strategyFn));

    // A POST /login route is created to handle login.
    app.post('/login', function (req, res, next) {

        var authCb = function (err, user) {

            if (err) return next(err);

            if (!user) {
                var error = new Error('Invalid login credentials.');
                error.status = 401;
                return next(error);
            }

            // req.logIn will establish our session.
            req.logIn(user, function (loginErr) {
                if (loginErr) return next(loginErr);
                // We respond with a response object that has user with _id and email.
                res.status(200).send({
                    user: user.sanitize()
                });
            });

        };

        passport.authenticate('local', authCb)(req, res, next);

    });

    app.post('/signup', function (req, res, next) {

        var authCb = function (err, user) {

            if (err) return next(err);

            if (user) {
                var error = new Error('User already exsists.');
                error.status = 401;
                return next(error);
            }

            else {
                user = req.body;
                makeUser(user)
                .then(function(user){

                    req.logIn(user, function (loginErr) {
                        if (loginErr) return next(loginErr);
                        // We respond with a response object that has user with _id and email.
                        res.status(200).send({
                            user: user.sanitize()
                        });
                    });
            })
        }

        } // auth

        // console.log("THIS IS THE SIGNUP STUFF", req.body);
        passport.authenticate('local', authCb)(req, res, next);

    });

}

