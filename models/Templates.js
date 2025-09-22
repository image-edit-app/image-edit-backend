const mongoose = require('mongoose');
const moment = require('moment');

const templateSchema = new mongoose.Schema({
  url: String,
  paid: Boolean,
  category: String,
  sub_category: String,
  created_at: { type: Number, default: moment.utc().valueOf() },
  updated_at: { type: Number, default: moment.utc().valueOf() }
});

module.exports = mongoose.model('Template', templateSchema);
