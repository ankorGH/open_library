const dotenv = require("dotenv").config();

module.exports = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT,
  COOKIE_NAME: process.env.COOKIE_NAME,
  COOKIE_KEY: process.env.COOKIE_KEY
};
