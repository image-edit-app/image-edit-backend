const mongoose = require('mongoose');
const moment = require('moment');

const userSchema = new mongoose.Schema({
  name: String,
  contact_number: String,
  password: String,
  is_new_user: Boolean,
  profile_pic: String,
  firm_name: String,
  address: String,
  otp: String,
  role: String,
  language: String,
  gender: String,
  DOB: { type: Number, default: moment.utc().valueOf() },
  subscription_details: [{
    plan_name: String,
    used_templates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Template' }],
    start_date: { type: Number, default: moment.utc().valueOf() },
    end_date: { type: Number, default: moment.utc().valueOf() }
  }],
  created_at: { type: Number, default: moment.utc().valueOf() },
  updated_at: { type: Number, default: moment.utc().valueOf() }
});

module.exports = mongoose.model('User', userSchema);
