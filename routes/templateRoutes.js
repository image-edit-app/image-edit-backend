const express = require('express');
const router = express.Router();
const Template = require('../models/Templates');
const Category = require('../models/Categories');
const SubCategory = require('../models/Subcategories');

// Get all templates with filters
// GET /api/templates?category=THOUGHTS
router.get('/', async (req, res) => {
  try {
    const { category, sub_category, paid } = req.query;

    const filter = {};

    if (paid !== undefined) {
      filter.paid = paid === 'true' || paid === true || paid === '1' || paid === 1;
    }

    if (category) {
      const existing_categories = await Category.find({ name: { $regex: category, $options: 'i' } });
      filter.categories = { $in: existing_categories.map(category => category._id) };
    }
    if (sub_category) {
      const existing_sub_categories = await SubCategory.find({ name: { $regex: sub_category, $options: 'i' } });
      filter.sub_categories = { $in: existing_sub_categories.map(sub_category => sub_category._id) };
    }

    const templates = await Template.find(filter);
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add templates
// POST /api/templates
router.post('/', async (req, res) => {
  try {
    const { url, categories, sub_categories, paid } = req.body;

    const existing_categories = await Category.find({ name: { $regex: categories, $options: 'i' } });
    const existing_sub_categories = await SubCategory.find({ name: { $regex: sub_categories, $options: 'i' } });

    const templates = new Template({
      url,
      categories: existing_categories.map(category => category._id),
      sub_categories: existing_sub_categories.map(sub_category => sub_category._id),
      paid
    });
    await templates.save();
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});

module.exports = router;
