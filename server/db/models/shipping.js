var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('shipping', {
   name: {
        type: Sequelize.TEXT
    },

    address: {
        type: Sequelize.TEXT
    },

    city: {
        type: Sequelize.TEXT
},
    state: {
        type: Sequelize.TEXT
    },
    zip: {
        type: Sequelize.INTEGER
    }
})
