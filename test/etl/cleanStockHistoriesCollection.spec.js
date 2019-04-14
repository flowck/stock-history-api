// Explicity change the enviroment to test
process.env.NODE_ENV = "test";

// Dependencies
const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const cleanStockHistoriesCollection = require("../../src/etl/cleanStockHistoriesCollection");


/**
 * Test the ../../etl/cleanStockHistoriesCollection.js
*/
describe("Clean stockHistories collection", () => {
  it("It should remove all the records in the stockHistories", async () => {
    try {
      // Execute the script
      const operationResult = await cleanStockHistoriesCollection();

      operationResult.should.be.a("object");
      operationResult.ok.should.be.eql(1);

      // End execution
      return Promise.resolve(operationResult);
    } catch (err) {
      return Promise.reject(err);
    }
  });
});