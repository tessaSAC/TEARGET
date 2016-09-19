var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('tear', {
    title: {
        type: Sequelize.STRING
    },
    // description: {
    //     type: Sequelize.STRING
    // },
    pictureUrl: {
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

    getterMethods: {
        description: function(){
            if (this.organic){
                let natural = 'organic'
                return (this.state + ' ' + natural + ' tears');
            }
            return (this.state + ' ' + 'tears');

        }
    },

    // 
    instanceMethods: {
        
    },
    classMethods: {

    },
    hooks: {

    }
});
