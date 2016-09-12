var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('men', {
    name: {
        type: Sequelize.STRING
    },
    bio: {
        type: Sequelize.STRING
    }
}, {
    instanceMethods: {

    },
    classMethods: {

    },
    hooks: {

    }
});

