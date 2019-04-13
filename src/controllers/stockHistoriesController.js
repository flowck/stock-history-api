// Dependencies
const StockHistories = require("../models/stockHistories");

module.exports.getStocks = async (req, res) => {
  try {
    const stocks = await StockHistories.find({}).limit(100);
    res.json(stocks);
  } catch (err) {
    // Send an error 400 response
    res.status(400).json(err);
  }
};
