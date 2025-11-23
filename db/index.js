// backend/db/index.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER || process.env.DB_USERNAME,
  process.env.DB_PASS || process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    dialect: process.env.DB_DIALECT || "postgres",
    logging: false,
  }
);

module.exports = sequelize;
