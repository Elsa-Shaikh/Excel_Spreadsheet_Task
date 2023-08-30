const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/spreadsheet";

const connectToMongo = async () => {
  await mongoose.connect(mongoURI);
  console.log("Successfully Connected to Mongo DB!");
};

module.exports = connectToMongo;
