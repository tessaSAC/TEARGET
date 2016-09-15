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
        discription: function(){
            return this.state + " " + this.organic + "tears";
        }
    },
    classMethods: {

    },
    hooks: {

    }
});