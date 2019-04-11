// Dependencies
const fs = require("fs");
const csv = require("csv-parser");
const db = require("../database/databaseConnection");
const StockHistories = require("../models/stockHistories");

// Connect to the dabatase
db.connect();

/**
 * importDataFromDatasets: This function will handle the import process
 * from all the data available in the datasets csv files
 *
 * HEAVY WORK
 * */
async function importDataFromDatasets() {
  /**
   * cleanDbCollection: This function will clean the stockHistories collection
   * before any insert ion is made.
   */
  async function cleanDbCollection() {
    try {
      await StockHistories.deleteMany({});
      console.log("The stockHistories was cleaned successfully");
    } catch (err) {
      throw err;
    }
  }
  // Call cleanDbCollection to clean the collection
  cleanDbCollection();

  /**
   * readCsvContent: This function takes a path file as an argument
   * read its content and then call the function saveRecordsInDb()
   * to persist the data.
   *
   * @param {string} path
   */
  function readCsvContent(path) {
    // Configs
    const result = [];
    // Using streams to process huge amount of data
    fs.createReadStream(path)
      .pipe(csv())
      .on("data", data => {
        // Transform fields
        data.adjustedClosePrice = data.adjclose;
        // Remove unused field
        data.adjclose;
        // Push the transformed data into the result array
        result.push(data);
      })
      .on("end", () => {
        // Persist the data right after the operation is completed
        saveRecordsInDb(result);
      });
  }

  /**
   * saveRecordsInDb: This function will receive an array as argument
   * and then persist this array in the database.
   */
  async function saveRecordsInDb(records) {
    try {
      // Insert the whole array at once.
      await StockHistories.insertMany(records);
      console.log(`${records.length} records persisted in the database!`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // readCsvContent(
  //   "/home/nextbss/Documentos/x/node/amex-nyse-nasdaq-stock-histories/fh_20190301/full_history/A.csv"
  // );
}

importDataFromDatasets();
