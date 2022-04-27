const db = require("../database/config");
const Sequelize = require('sequelize');

const RentedCar = db.define("rentedcars", { 
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    manufacturer: {
        type: Sequelize.STRING,
    },

    model: {
        type: Sequelize.STRING,
    },

    image: {
        type: Sequelize.STRING,
    },
    
    description: {
        type: Sequelize.STRING,
    },
}); 

module.exports = RentedCar;