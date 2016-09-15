'use strict';
var db = require('./_db');


// eslint-disable-next-line no-unused-vars
let User = require('./models/user');
let Cart = require('./models/cart');
let Man = require('./models/man');
let Tear = require('./models/tear');

// Cart.belongsTo(User, {as: 'user'});
Cart.belongsTo(User);
User.hasMany(Cart);

Man.hasMany(Tear);




// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
module.exports =  db;