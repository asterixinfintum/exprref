"use strict";

var mongoose = require('mongoose');

// Define the schema for the raw message array
var rawMessageArraySchema = new mongoose.Schema({
  messages: {
    type: [mongoose.Schema.Types.Mixed],
    required: true
  }
}, {
  timestamps: true
});
var RawMessageArray = mongoose.model('RawMessageArray', rawMessageArraySchema);
module.exports = RawMessageArray;