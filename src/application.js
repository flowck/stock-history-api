// Dependencies
const express = require("express");
const morgan = require("morgan");
const db = require("./database/databaseConnection");
const routes = require("./routes");

// Create a new express application
const app = express();

// Connect to the database
db.connect();

/**
 * Configs
 */
app.use("/api/v1", routes);

// Setup morgan only in the development env
if (process.env.NODE_ENV !== "test" || process.env.NODE_ENV !== "production") {
  app.use(morgan("tiny"));
}
/**
 * Listen the web app's server into a port
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`StockHistories web server is up and running on port: ${PORT}`);
});

// Enable testing
module.exports = app;
