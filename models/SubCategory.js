const mongoose = require('mongoose');
const moment = require('moment');

const subCategorySchema = new mongoose.Schema({
  name: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  created_at: { type: Number, default: moment.utc().valueOf() },
  updated_at: { type: Number, default: moment.utc().valueOf() }
});


module.exports = mongoose.model('SubCategory', subCategorySchema);
