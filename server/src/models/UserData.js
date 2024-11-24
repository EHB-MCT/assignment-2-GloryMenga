const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
  sessionDuration: Number,
  promptKeywords: [String],
  shares: Number,
  publicShares: Number,
  privateShares: Number,
  conversionRate: Number,
});

module.exports = mongoose.model('UserData', UserDataSchema);
