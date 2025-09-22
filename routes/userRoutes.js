const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users(CUSTOMER, SUPPLIER, ADMIN) with filters
// GET /api/users?role=CUSTOMER
router.get('/', async (req, res) => {
  try {
    const { role, plan_name } = req.query;

    let filter = {};

    if (role) filter.role = role;

    const users = await User.find(filter);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ADMIN/USER login and signup
// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { contact_number, password, otp } = req.body;
    const user = await User.findOne({ contact_number });
    if (user) {
      if (user.role === "ADMIN") {
        if (password === user.password) {
          res.json({ user });
        } else {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
      } else {
        if (otp === user.otp) {
          res.json({ user });
        } else {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
      }
    } else {
      const new_user = new User({ contact_number, otp, role: "USER" });
      await new_user.save()
      res.json({ user });
    }

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/users/:id - get a single user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/users/:id - update a single user
router.put('/:id', async (req, res) => {
  try {
    const { name, profile_pic, firm_name, address, language, gender, DOB } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, profile_pic, firm_name, address, language, gender, DOB }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
