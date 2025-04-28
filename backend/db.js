const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Could not connect to database:", error.message);
  }
};

module.exports = connection;