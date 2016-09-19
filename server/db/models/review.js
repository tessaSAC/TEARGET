var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('review', {
    
    rating: {
        type: Sequelize.INTEGER
    },

    text: {
        type: Sequelize.TEXT
    },

    date: {
        type: Sequelize.DATEONLY
    }
}, {
    instanceMethods: {

    },
    classMethods: {

    },
    hooks: {

    }
});
