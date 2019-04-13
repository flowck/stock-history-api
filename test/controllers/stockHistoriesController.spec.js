// Dependencies
const chai = require("chai");
const http = require("chai-http");
const controller = require("../../src/controllers/stockHistoriesController");
const app = require("../../src/application");

// Set the environment to: test
process.env.NODE_ENV = "test";

// Setup chai with chai-http
chai.use(http);

/**
 * Stocks
 */

describe("Stocks", () => {
  it ("It should get the initial 100 stocks", (done) => {
    chai.request(app)
      .get("/api/v1/stocks")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(100);
        done();
      });
  });
});