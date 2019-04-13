/**
 * index.js / routes: It exports an express router object
 * with all the api routes defined.
 */

// Dependencies
const api = require("express").Router();
const stockHistoriesController = require("../controllers/stockHistoriesController");

api.get("/", (req, res) => {
  res.json({ message: "API is alive" });
});

/**
 * /stocks
 *
 */
api.get("/stocks", stockHistoriesController.getStocks);

module.exports = api;
