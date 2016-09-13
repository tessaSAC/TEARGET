var Sequelize = require('sequelize');
var db = require('../_db');
var user = require('./user');

module.exports = db.define('cart', {
    user: {
        type: Sequelize.STRING
    },
    items: {
        type: Sequelize.JSON(Sequelize.TEXT)
    },
    total: {
        type: Sequelize.DECIMAL
    }
}, {
    instanceMethods: {

    },
    classMethods: {

    },
    hooks: {

    }
});
