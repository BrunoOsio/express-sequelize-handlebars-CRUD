const Sequelize = require('sequelize');

const schema = "rentedcars";
const username = "root";
const password = "root"; //modifique a senha de seu banco de dados
const host = "localhost";
const dialect = "mysql";

const sequelize = new Sequelize(
    schema, 
    username, 
    password, 
    {
        host: host,
        dialect: dialect, 
    }
);

module.exports = sequelize;