const mongoose = require("mongoose");
const pointSchema = require("./point");

mongoose.Promise = Promise;

const toilet = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: {
      unique: false
    }
  },
  location: {
    type: pointSchema,
    required: true,
    index: {
      type: "2dsphere",
      sparse: true
    }
  },
  description: {
    type: String,
    required: false
  },
  creationDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  author: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: true
  },
}, {
  collection: "toilets",
  versionKey: false
});

toilet.index({
  loc: "2dsphere"
});

module.exports = mongoose.model("toilets", toilet);
