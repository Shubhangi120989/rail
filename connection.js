const { Sequelize } = require('sequelize');

const db = new Sequelize('railwayproject', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

});

module.exports = { db, Sequelize };
