// Dependencies
const fs = require("fs");
const csv = require("csv-parser");
const es = require("event-stream");
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
   * getCsvFilesDir: This function will receive a string representing a directory
   * then, will read all the file directories inside the folder and return it
   * as an array.
   *
   * @param {string} rootDirectory
   */
  async function getCsvFilesDir(rootDirectory) {
    try {
      // Read all the file names from the root directory
      const result = await fs.promises.readdir(rootDirectory, {
        encoding: "utf8"
      });
      // Return the result array with the full path of the datasets
      return Promise.resolve(result.map(dir => `${rootDirectory}/${dir}`));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * getCsvRecords: This function takes a path file as an argument
   * read its content and then call the function saveRecordsInDb()
   * to persist the data.
   *
   * @param {string} path
   */
  function getCsvRecords(path) {
    return new Promise((resolve, reject) => {
      // Configs
      const result = [];
      // Using streams to process huge amount of data
      fs.createReadStream(path)
        .pipe(csv())
        .on("data", row => {
          // Transform fields
          row.adjustedClosePrice = row.adjclose;
          // Remove unused field
          delete row.adjclose;
          // Push the transformed data into the result array
          // console.log("STREAM: ", row);
          result.push(row);
        })
        .on("error", err => reject(err))
        .on("end", () => {
          // Persist the data right after the operation is completed
          // saveRecordsInDb(result);
          resolve(result);
        });
    });
  }

  /**
   * saveRecordsInDb: This function will receive an array as argument
   * and then persist this array in the database.
   */
  async function saveRecordsInDb(records) {
    try {
      // Insert the whole array at once.
      const result = await StockHistories.insertMany(records);
      console.log(`✔️ - ${records.length} records persisted in the database!`);
      return Promise.resolve(result);
    } catch (err) {
      console.log(err);
      Promise.reject(err);
    }
  }

  // getCsvRecords(
  //   "/home/nextbss/Documentos/x/node/amex-nyse-nasdaq-stock-histories/fh_20190301/full_history/A.csv"
  // );

  /**
   * initETL: This function will start this ETL script by executing all the
   * functions needed to successfully load all the .csv files, parse it and then
   * persist in the database.
   */
  async function initETL() {
    try {
      // Root directory
      const rootDirectory =
        "/home/nextbss/Documentos/x/node/amex-nyse-nasdaq-stock-histories/fh_20190301/full_history";

      // Get all the datasets directories
      const datasetPaths = await getCsvFilesDir(rootDirectory);
      let datasetRecords = null;

      for (let dataset of datasetPaths) {
        // Get the dataset records
        datasetRecords = await getCsvRecords(dataset);
        // Save the whole dataset in the database
        await saveRecordsInDb(datasetRecords);
      }

      // End the execution
      // process.exit(1);
    } catch (err) {
      throw err;
    }
  }

  initETL();
}

importDataFromDatasets();
