const express = require('express');
const router = express.Router();
const Template = require('../models/Template');
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const SubscriptionPlan = require('../models/SubscriptionPlan');

// Get all templates with filters
// GET /api/templates?category=THOUGHTS
router.get('/', async (req, res) => {
  try {
    const { category, sub_category, plans } = req.query;

    const filter = {};

    if (plans !== undefined) {
      const existing_plans = await SubscriptionPlan.find({ name: { $regex: plans, $options: 'i' } });
      filter.plans = { $in: existing_plans.map(plan => plan._id) };
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

//Update template
// PUT /api/templates/:id
router.put('/:id', async (req, res) => {
  try {
    const { url, categories, sub_categories, plans } = req.body;
    const existing_categories = await Category.find({ name: { $regex: categories, $options: 'i' } });
    if(existing_categories.length === 0) {
      return res.status(404).json({ error: 'Categories not found' });
    }
    const existing_sub_categories = await SubCategory.find({ name: { $regex: sub_categories, $options: 'i' } });
    if(existing_sub_categories.length === 0) {
      return res.status(404).json({ error: 'Subcategories not found' });
    }
    const existing_plans = await SubscriptionPlan.find({ name: { $regex: plans, $options: 'i' } });
    if(existing_plans.length === 0) {
      return res.status(404).json({ error: 'Plans not found' });
    }
    const template = await Template.findById(req.params.id); 
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    } 
    template.url = url;
    template.categories = existing_categories.map(category => category._id);
    template.sub_categories = existing_sub_categories.map(sub_category => sub_category._id);
    template.plans = existing_plans.map(plan => plan._id);
    await template.save();
    res.json(template);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



//Update status of template 
// PATCH /api/templates/:id
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const template = await Template.findByIdAndUpdate(req.params.id, { status });
    if (!template) {  
      return res.status(404).json({ error: 'Template not found' });
    }
    res.json(template);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Delete template
// DELETE /api/templates/:id
router.delete('/:id', async (req, res) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.id);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.json(template);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
