const express = require('express');
const router = express.Router();
const Category = require('../models/Categories');
const moment = require('moment');

// GET /api/categories?name="Samsung" - get all categories
router.get('/', async (req, res) => {
  try {
    const { name } = req.query;

    let filter = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' }; // partial, case-insensitive match
    }

    const categories = await Category.find(filter);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST /api/category - create a new category
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const category = new Category({
      name,
      created_at: moment.utc().valueOf(),
      updated_at: moment.utc().valueOf()
    });
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/category/:id - get a single category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
