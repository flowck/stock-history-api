// Dependencies
const redisClient = require("../database/cacheDatabseConnection").client;

/**
 * cache: This module is a middleware that will intercept the
 * GET request on /stocks to send a response with the cached records
 * in case they exist in redis.
 */
module.exports.cache = async (req, res, next) => {
  const { limit, year } = req.query;
  const currentYear = new Date().getFullYear();

  /**
   * CheckClient: This function will check if redis has records
   * in memory, if so, will send a response. Otherwise will continue
   * to the controller.
   */
  function CheckCache() {
    redisClient.get("stockHistories", (err, data) => {
      // Throw an error if there's any
      if (err) throw err;
      // Check the results from redis
      if (data !== null) {
        res.status(200).json(JSON.parse(data));
      } else {
        // If the result in cache is null, then goes to the controller.
        next();
      }
    });
  }

  // Check the query params: If different than the default ones
  // then goes next to the controller.
  if (limit === undefined && year === undefined) {
    CheckCache();
  } else if (limit !== 50 || parseInt(year) !== currentYear) {
    next();
  } else {
    CheckCache();
  }
};
