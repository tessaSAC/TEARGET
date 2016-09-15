var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('cart', {
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
