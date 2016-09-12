var Sequelize = require('sequelize');
var db = require('../_db');
var men = require('men');

module.exports = db.define('tears', {
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    organic: {
        type: Sequelize.STRING
    },
    amount_left: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.DECIMAL
    },
    size: {
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