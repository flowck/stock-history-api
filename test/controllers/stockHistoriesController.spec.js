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
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(50);
        done();
      });
  });

  /**
   * GET /stocks?limit=100
   * 
   * It should send a 200 response
   * It should response with an array body
   * It should response with a body with 200
   * items at least as passed in the `limit` query param
  */
  it ("It should response with 100 records", (done) => {
    chai.request(app)
      .get("/api/v1/stocks?limit=100")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(100);
        done();
      });
  });

  /**
   * GET /stocks?year=2000
   * 
   * It should send a 200 response
   * It should response with an array body
   * It should response with a body with at least on record
   * dated from the year 2000
  */
 it ("It should response with record from 2000", (done) => {
  chai.request(app)
    .get("/api/v1/stocks?year=2000")
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a("array");
      console.log("BODY: ", res.body[0]);
      // Find at least one record with a date from the year 2000 
      const record = res.body.find(record => {
        return new Date(record.date).getFullYear() === 2000;
      });
      // record.should.be.a("object");
      console.log(record);
      done();
    });
});
});