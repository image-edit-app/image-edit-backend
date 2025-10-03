const mongoose = require('mongoose');
const moment = require('moment');

const categorySchema = new mongoose.Schema({
  name: String,
  created_at: { type: Number, default: moment.utc().valueOf() },
  updated_at: { type: Number, default: moment.utc().valueOf() }
});

module.exports = mongoose.model('Category', categorySchema);
