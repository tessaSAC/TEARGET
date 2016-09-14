'use strict';
var db = require('./_db');


// eslint-disable-next-line no-unused-vars
let User = require('./models/user');
let Cart = require('./models/cart');
let Men = require('./models/men');
let Tears = require('./models/tears');

// Cart.belongsTo(User, {as: 'user'});
User.belongsTo(Cart, {as: 'cart'});

Men.hasMany(Tears, {as: 'man'});
Tears.hasMany(Men, {as: 'tear'});



// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
module.exports =  {
    db: db,
    User: User,
    Cart: Cart,
    Men: Men,
    Tears: Tears
};