
const mongoose = require("mongoose");
const { DB_URI } = require("../config/dotEnv");

const connectDb = async () => {

   await  mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

}


module.exports = connectDb;
