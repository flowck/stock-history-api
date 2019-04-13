// Dependencies
const StockHistories = require("../models/stockHistories");

module.exports.getStocks = async (req, res) => {

  // Query options
  const findOptions = {};
  const sort = {};  

  // Query paramaters
  let { limit, year } = req.query;

  // Check if the year query params was defined
  if (year) {
    year = parseInt(year) + 1;
    year = year.toString();
    findOptions.date = { $lte: new Date(year).toISOString() };
  }

  try {
    // Query results
    let stocks = await StockHistories
      .find(findOptions)
      .limit(parseInt(limit) || 50)

    // Send the request response 
    res.status(200).json(stocks);
  } catch (err) {
    // Send an error 400 response
    res.status(400).json(err);
  }
};
