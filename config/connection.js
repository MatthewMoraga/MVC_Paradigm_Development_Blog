const { Sequelize } = require("sequelize");
require('dot').config();

console.log(DB_NAME);

const sequelize = process.env.JAWSDB_URL 
    ? new Sequelize(process.env.JAWSDB_URL)
    : new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: "localhost",
        dialect: "mysql"
});

module.exports = sequelize;