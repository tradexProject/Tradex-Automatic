const pg = require('pg'); 
const { Sequelize } = require("sequelize");
const configs = require("./database"); 

const env = process.env.NODE_ENV || "development";
const config = configs[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: "postgres",
    dialectModule: pg,
    logging: config.logging
  }
);

module.exports = { sequelize };