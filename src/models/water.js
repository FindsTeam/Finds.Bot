const mongoose = require("mongoose");
const pointSchema = require("./point");

mongoose.Promise = Promise;

const water = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    index: {
      unique: false,
    },
  },
  location: {
    type: pointSchema,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
}, {
  collection: "water",
  versionKey: false
});

water.index({
  location: "2dsphere",
});

module.exports = mongoose.model("water", water);
