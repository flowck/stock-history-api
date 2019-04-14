// Explicity change the enviroment to test
process.env.NODE_ENV = "test";

// Dependencies
const chai = require("chai");
const http = require("chai-http");
const app = require("../../src/application");
const importDataFromDataset = require("../../src/etl/importDataFromDataset");
const cleanStockHistoriesCollection = require("../../src/etl/cleanStockHistoriesCollection");

// Setup chai with chai-http
chai.use(http);
const should = chai.should();

/**
 * Stocks
 */

describe("Stocks", () => {

  /**
   * Before all test suites, import the data from the testing dataset to the
   * testing database.
  */
  before(async () => {
    try {
      // Import the testing dataset to the database
      const result = await importDataFromDataset();
      return Promise.resolve(result);
    } catch(err) {
      return Promise.reject(err);
    }
  });

  /**
   * After all test suites, clean the stockHistories collection
  */
  after(async () => {
    try {
      // Import the testing dataset to the database
      const result = await cleanStockHistoriesCollection();
      return Promise.resolve(result);
    } catch(err) {
      return Promise.reject(err);
    }
  });

  /**
   * GET /stocks
   * 
   * It should send a 200 response
   * It should response with an array body
   * It should response with a body with 50 items at least
  */
  it ("[GET] /stocks", (done) => {
    chai.request(app)
      .get("/api/v1/stocks")
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(50);
        done();
      });
  });

  /**
   * GET /stocks
   * 
   * It should send a 200 response
   * It should response with an array body
   * It should response with a body with 200
   * items at least as passed in the `limit` query param
  */
  // it ("It should response with 100 records", (done) => {
  //   chai.request(app)
  //     .get("/api/v1/stocks?limit=100")
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.should.be.a("array");
  //       res.body.length.should.be.eql(100);
  //       done();
  //     });
  // });
});