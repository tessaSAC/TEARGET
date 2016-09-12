'use strict';
var db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
let User = require('./models/user');
let Cart = db.model('cart');
let Men = db.model('men');
let Tears = db.model('tears');

Cart.belongsTo(User, {as: 'cart'});
Tears.belongsTo(Men, {as: 'tears'});

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
