// Dependencies
const mongoose = require("mongoose");
const env = process.env.NODE_ENV || "dev";
const config = require("../../config")[env];

// Server settings
const OPTIONS = { useNewUrlParser: true };

console.log("DB: ", config.DB_NAME);

/*
 * connect: This module handle the database connection
 * everytime is requested by the application.
 **/
module.exports.connect = () => {
  try {
    // Connect to a mongodb instance
    mongoose.connect(
      `mongodb://${config.SERVER_NAME}/${config.DB_NAME}`,
      OPTIONS
    );

    // Database connection
    const DB_CONNECTION = mongoose.connection;

    /**
     * Dabatase events
     */

    // On error
    DB_CONNECTION.on(
      "error",
      console.error.bind(console, "Connection errro: ")
    );

    // Once open
    DB_CONNECTION.once("open", () => {
      console.log("The stock history service is connected to the database.");
    });
  } catch (e) {
    console.log(e);
  }
};
