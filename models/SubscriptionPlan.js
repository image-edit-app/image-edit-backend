const mongoose = require('mongoose');
const moment = require('moment');

const subscriptionPlanSchema = new mongoose.Schema({
  name: String,
  price: String,
  duration: String,
  description: String,
  status: String,
  created_at: { type: Number, default: moment.utc().valueOf() },
  updated_at: { type: Number, default: moment.utc().valueOf() }
});


module.exports = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
