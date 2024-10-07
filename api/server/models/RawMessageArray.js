const mongoose = require('mongoose');

// Define the schema for the raw message array
const rawMessageArraySchema = new mongoose.Schema({
  messages: {
    type: [mongoose.Schema.Types.Mixed],
    required: true
  }
}, {
  timestamps: true
});

const RawMessageArray = mongoose.model('RawMessageArray', rawMessageArraySchema);

module.exports = RawMessageArray;