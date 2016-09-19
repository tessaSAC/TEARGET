var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('man', {
    name: {
        type: Sequelize.STRING
    },
    bio: {
        type: Sequelize.TEXT
    },
    pictureUrl: {
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

