const mongoose = require('mongoose');
const moment = require('moment');

const templateSchema = new mongoose.Schema({
  url: String,
  paid: Boolean,
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  sub_categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }],
  created_at: { type: Number, default: moment.utc().valueOf() },
  updated_at: { type: Number, default: moment.utc().valueOf() }
});

module.exports = mongoose.model('Template', templateSchema);
