'use strict';
var db = require('./_db');


// eslint-disable-next-line no-unused-vars
let User = require('./models/user');
let Cart = require('./models/cart');
let Man = require('./models/man');
let Tear = require('./models/tear');
let Review = require('./models/review');
let Shipping = require('./models/shipping')
// Cart.belongsTo(User, {as: 'user'});
Cart.belongsTo(User);
User.hasMany(Cart);
Tear.belongsTo(Man);
Man.hasMany(Tear);
Review.belongsTo(Tear);
Tear.hasMany(Review);
Review.belongsTo(User);
User.hasMany(Review)
Shipping.belongsTo(User);
User.hasMany(Shipping);


// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
module.exports =  db;
