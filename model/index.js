const mongoose = require("mongoose");
const { DB_URL } = require("../config");

const connectToDatabase = () => {
  const db = mongoose.connection;
  mongoose.connect(DB_URL, { useNewUrlParser: true, useCreateIndex: true });
  db.once("open", () => {
    console.log("connected to database");
  });
  db.on("error", () => {
    console.log("Error connecting to database");
  });
};

module.exports = connectToDatabase;
