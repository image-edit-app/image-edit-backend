const mongoose = require('mongoose');
const moment = require('moment');

const templateSchema = new mongoose.Schema({
  url: String,
  plans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionPlan' }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  sub_categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }],
  status: String,
  created_at: { type: Number, default: moment.utc().valueOf() },
  updated_at: { type: Number, default: moment.utc().valueOf() }
});

module.exports = mongoose.model('Template', templateSchema);
