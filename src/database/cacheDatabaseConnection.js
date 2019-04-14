// Dependencies
const redis = require("redis");

// Configs
const REDIS_PORT = process.env.REDIS_PORT;

// Create a redis client
const client = redis.createClient(REDIS_PORT);

/**
 * connect: This module will handle the redis
 * connection.
 */
module.exports.connect = () => {
  // Listen for errors while connecting
  client.on("error", err => {
    throw err;
  });

  // Once onnected
  client.on("connect", () => {
    console.log("The redis server is up, running and ready to cache.");
  });
};

/**
 * client: This module will export an instance of redis to the whole
 * application.
 */
module.exports.client = client;
