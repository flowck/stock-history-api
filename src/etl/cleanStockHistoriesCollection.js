// Dependencies
const db = require("../database/databaseConnection");
const StockHistories = require("../models/stockHistories");
// Connect to the dabatase
db.connect();
/**
 * cleanStockHistoriesCollection: This function will clean the stockHistories collection
 * before any insert ion is made.
 */
async function cleanStockHistoriesCollection() {
  try {
    const operationResult = await StockHistories.deleteMany({});
    console.log("Dataset is cleaned");
    return Promise.resolve(operationResult);
  } catch (err) {
    return Promise.reject(err);
  }
}

// Prevent auto execution in the test environment
if (process.env.NODE_ENV !== "test") {
  // Call cleanStockHistoriesCollection to clean the collection
  cleanStockHistoriesCollection();
}

// Export module
module.exports = cleanStockHistoriesCollection;
