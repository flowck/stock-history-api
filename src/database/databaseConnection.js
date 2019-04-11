// Dependencies
const mongoose = require("mongoose");

// Server settings
const SERVER_NAME = "localhost";
const DB_NAME = "stockHistoryService";
const OPTIONS = { useNewUrlParser: true };

/*
 * connect: This module handle the database connection
 * everytime is requested by the application.
 **/
module.exports.connect = () => {
  try {
    // Connect to a mongodb instance
    mongoose.connect(`mongodb://${SERVER_NAME}/${DB_NAME}`, OPTIONS);

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
