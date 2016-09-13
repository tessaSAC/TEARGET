'use strict';
var db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
let User = require('./models/user');
let Cart = require('./models/cart');
let Men = require('./models/men');
let Tears = require('./models/tears');

Cart.belongsTo(User, {as: 'user'});

Men.hasMany(Tears, {as: 'man'});


// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
