// Dependencies
const chai = require("chai");
const http = require("chai-http");
const controller = require("../../src/controllers/stockHistoriesController");
const app = require("../../src/application");

// Set the environment to: test
process.env.NODE_ENV = "test";

// Setup chai with chai-http
chai.use(http);
const should = chai.should();

/**
 * Stocks
 */

describe("Stocks", () => {
  it ("It should response", (done) => {
    chai.request(app)
      .get("/api/v1/stocks")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(50);
        done();
      });
  });

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
  // process.exit();
});