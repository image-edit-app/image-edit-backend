const express = require('express');
const router = express.Router();
const Template = require('../models/Templates');

// Get all templates with filters
// GET /api/templates?category=THOUGHTS
router.get('/', async (req, res) => {
  try {
    const { category, sub_category, paid } = req.query;

    const filter = {};

    if (paid !== undefined) {
      filter.paid = paid === 'true' || paid === true || paid === '1' || paid === 1;
    }

    if (category) filter.categories = category;           // matches arrays containing "category"
    if (sub_category) filter.sub_categories = sub_category; // matches arrays containing "sub_category"

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

    const templates = new Template({ url, categories, sub_categories, paid });
    await templates.save();
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});

module.exports = router;
