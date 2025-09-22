const express = require('express');
const router = express.Router();
const Template = require('../models/Templates');

// Get all templates with filters
// GET /api/templates?category=THOUGHTS
router.get('/', async (req, res) => {
  try {
    const { category, sub_category, paid } = req.query;

    let filter = {};

    if (paid) filter.paid = paid;
    if (category) filter.category = category;
    if (sub_category) filter.sub_category = sub_category;

    const templates = await Template.find(filter);
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
