const express = require('express');
const router = express.Router();
const Category = require('../models/Categories');
const SubCategory = require('../models/SubCategories');
const moment = require('moment');

// GET /subcategories?subCategoryName=Iphone&categoryName=Samsung - get all subcategories
router.get('/', async (req, res) => {
  try {
    const subCategoryName = req.query.subCategoryName;
    const categoryName = req.query.categoryName;

    let filter = {};

    // Step 1: If category name is provided, find category's ObjectId
    if (categoryName) {
      const categoryFromDb = await Category.findOne({ name: { $regex: categoryName, $options: 'i' } });
      if (!categoryFromDb) {
        return res.status(404).json({ message: 'Category not found' });
      }
      filter.category = categoryFromDb._id;
    }

    // Step 2: If subCategory name is provided, add to filter
    if (subCategoryName) {
      filter.name = { $regex: subCategoryName, $options: 'i' }; // case-insensitive match
    }

    let subCategories = await SubCategory.find(filter).populate('category');
    console.log(subCategories);

    res.json(subCategories);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/subcategories - create a new subCategory
router.post('/', async (req, res) => {
  try {
    const { name, category_name } = req.body;

    if (!name || !category_name) {
      return res.status(400).json({ error: 'name and category_name are required' });
    }

    // Find category by name (case-insensitive)
    const categoryDoc = await Category.findOne({ name: { $regex: category_name, $options: 'i' } });
    if (!categoryDoc) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const categoryId = categoryDoc._id;

    const subCategory = new SubCategory({ name, category: categoryId });
    await subCategory.save();

    return res.status(201).json(subCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/subcategories/:id - get a single subCategory
router.get('/:id', async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id).populate('category');
    if (!subCategory) {
      return res.status(404).json({ error: 'SubCategory not found' });
    }
    res.json(subCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
