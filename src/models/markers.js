const mongoose = require("mongoose");

mongoose.Promise = Promise;

const marker = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: {
            unique: false
        }
    },
    address: {
      type: String,
      required: false
    },
    location: {
        type: [Number],
        index: {
            type: "2dsphere",
            sparse: true
        }
    },
    type: {
        type: [String],
        required: false
    },
    description: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: true
    }
});

marker.index({ loc: "2dsphere" });

module.exports = mongoose.model("markers", marker);