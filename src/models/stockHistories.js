// Dependencies
const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

// Stock histories' schema
const stockHistoriesSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  volume: {
    type: Number,
    required: true
  },
  open: {
    type: Number,
    required: true
  },
  close: {
    type: Number,
    required: true
  },
  high: {
    type: Number,
    required: true
  },
  low: {
    type: Number,
    required: true
  },
  adjustedClosePrice: {
    type: Number,
    required: true
  },
  symbol: {
    type: String
  },
  companyName: {
    type: String
  }
});

// Set mongoose-timestamps to generate the: createdAt and updatedAt fields.
stockHistoriesSchema.plugin(timestamps);

// Export the stockistories' model
module.exports = mongoose.model("StockHistories", stockHistoriesSchema);
