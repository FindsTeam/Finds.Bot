const mongoose = require("mongoose");

module.exports.connect = () => {
  mongoose.connect(process.env.MONGODB_CONNECTION, {
    useCreateIndex: true,
    useNewUrlParser: true
  });
  mongoose.Promise = Promise;
};