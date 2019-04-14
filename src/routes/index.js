/**
 * index.js / routes: It exports an express router object
 * with all the api routes defined.
 */

// Dependencies
const api = require("express").Router();
const stockHistoriesController = require("../controllers/stockHistoriesController");
const cache = require("../middlewares/cache").cache;

api.get("/", (req, res) => {
  res.json({ message: "API is alive" });
});

/**
 * /stocks
 *
 */
api.get("/stocks", cache, stockHistoriesController.getStocks);

module.exports = api;
