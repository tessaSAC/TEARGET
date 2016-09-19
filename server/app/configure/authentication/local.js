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

            .then(function(user2){


                return user2.addCart(cart);
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
                // console.log("THIS IS LSOTRAGE", localStorage);
                if (loginErr) return next(loginErr);
                res.status(200).send({
                    user: user.sanitize(),
                    sessionId: req.session.id
                });
            });

        };

        passport.authenticate('local', authCb)(req, res, next);
        // console.log(req.session.sid);

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

                .then(function(user2){
                        req.logIn(user2, function (loginErr) {
                        if (loginErr) return next(loginErr);
                        res.status(200).send({
                            user: user2.sanitize()
                        });
                    });
            })
        }

        } // auth

        passport.authenticate('local', authCb)(req, res, next);

    });

}

