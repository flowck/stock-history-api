// Dependencies
const mongoose = require("mongoose");
const config = require("../../config");

// Set the development environment
if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = "dev";
}

// Access config properties of the current environment
let dbConfig = config[process.env.NODE_ENV];

// Server settings
const OPTIONS = { useNewUrlParser: true };

/*
 * connect: This module handle the database connection
 * everytime is requested by the application.
 **/
module.exports.connect = () => {
  try {
    // Connect to a mongodb instance
    mongoose.connect(
      `mongodb://${dbConfig["SERVER_NAME"]}/${dbConfig["DB_NAME"]}`,
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
