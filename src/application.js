// Dependencies
const express = require("express");
const morgan = require("morgan");
const mongodb = require("./database/databaseConnection");
const redis = require("./database/cacheDatabaseConnection");
const routes = require("./routes");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("./swagger/swagger.json");

// Create a new express application
const app = express();

/**
 * Databases: MongoDB and Redis
 */

// Connect to the persistence layer: MongoDB
mongodb.connect();

// Connect to the cache layer: Redis
redis.connect();

/**
 * Configs
 */
app.use(cors());
app.use("/api/v1", routes);

// Setup morgan only in the development env
if (process.env.NODE_ENV === "dev") {
  app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
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
