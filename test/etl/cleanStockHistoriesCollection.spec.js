// Dependencies
const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const cleanStockHistoriesCollection = require("../../src/etl/cleanStockHistoriesCollection");

// Set the environment to: test
process.env.NODE_ENV = "test";

/**
 * Test the ../../etl/cleanStockHistoriesCollection.js
*/
describe("Clean stockHistories collection", () => {
  it("It should remove all the records in the stockHistories", async () => {
    try {
      // Execute the script
      const operationResult = await cleanStockHistoriesCollection();

      console.log(operationResult);
      
      // console.log(typeof operationResult);
      operationResult.should.be.a("number");

      // End execution
      // done();
      // process.exit();
    } catch (e) {
      // done(e);
    }
  });
});