var Sequelize = require('sequelize');
var db = require('../_db');
var man = require('./man');

module.exports = db.define('tear', {
    title: {
        type: Sequelize.STRING
    },
    // description: {
    //     type: Sequelize.STRING
    // },
    photo: {
        type: Sequelize.STRING
    },

    state: {
        type: Sequelize.ENUM('happy', 'sad', 'angry')
    },
    organic: {
        type: Sequelize.BOOLEAN
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
        description: function(){
            return (this.state + ' ' + this.organic + 'tears');
        }
    },
    classMethods: {

    },
    hooks: {

    }
});
