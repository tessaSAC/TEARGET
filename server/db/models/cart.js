var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('cart', {
    items: {
        type: Sequelize.JSON(Sequelize.TEXT)
    },
    total: {
        type: Sequelize.DECIMAL
    },
    is_open: {
        defaultValue: true,
        type: Sequelize.BOOLEAN
    }
}, {
    instanceMethods: {

    },
    classMethods: {

    },
    hooks: {

    }
});
