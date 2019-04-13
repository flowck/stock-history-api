// Dependencies
const Joi = require("joi");

/**
 * Stocks
*/

// getStocks controller validation rules
module.exports.getStocks = {
  params: {
    limit: Joi.string().min(1).max(100)
  }
}