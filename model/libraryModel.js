const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  BookName: {
    type: String,
    require: true,
  },
  Description: {
    type: String,
    require: true,
  },
  Author: {
    type: String,
    require: true,
  },
  Comment: {
    type: String,
    require: true,
  },
  Status: {
    type: String,
    require: true,
  },
});

const Library = mongoose.model("LIBRARY", librarySchema);
module.exports = Library;
