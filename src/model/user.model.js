const db = require("../database/config");
const Sequelize = require('sequelize');

const User = db.define("users", { 
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    email: {
        type: Sequelize.STRING,
    },

    password: {
        type: Sequelize.STRING,
    },
}); 

module.exports = User;