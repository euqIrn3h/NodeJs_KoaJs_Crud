const Sequelize = require('sequelize');
const database = require('./../db.js');

const Country = database.define('countries', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Country;