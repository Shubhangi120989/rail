const { Sequelize } = require('sequelize');

const db = new Sequelize('railwayproject', 'root', 'Shubhangi@2004', {
    host: 'localhost',
    dialect: 'mysql',

});

module.exports = { db, Sequelize };
