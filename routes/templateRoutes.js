const express = require('express');
const router = express.Router();
const Template = require('../models/Template');

// Get all templates with filters
// GET /api/templates?category=THOUGHTS
router.get('/', async (req, res) => {
  try {
    const { category, sub_category } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (sub_category) filter.sub_category = sub_category;

    const templates = await Template.find(filter);
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});