// Dependencies
const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const uuidv4 = require("uuidv4");

// User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  accountRecoverCode: {
    type: String,
    default: uuidv4()
  }
});

// Set mongoose-timestamps to generate the: createdAt and updatedAt fields.
userSchema.plugin(timestamps);

// Export the users' model
module.exports = mongoose.model("Users", userSchema);
