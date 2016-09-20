var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('shipping', {
   Name: {
        type: Sequelize.TEXT
    },

    Address: {
        type: Sequelize.TEXT
    },

    City: {
        type: Sequelize.TEXT
},
    State: {
        type: Sequelize.TEXT
    },
    Zip : {
        type: Sequelize.INTEGER
    }
}, {
    instanceMethods: {

    },
    classMethods: {

    },
    hooks: {

    }
});
