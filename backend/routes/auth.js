const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const authMiddleware = require('../middleware/auth');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, admin: { email: admin.email } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/auth/setup - create initial admin (run once)
router.post('/setup', async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      return res.status(400).json({ success: false, error: 'Admin already exists' });
    }
    const admin = new Admin({
      email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
      password: process.env.ADMIN_PASSWORD || 'admin123'
    });
    await admin.save();
    res.status(201).json({ success: true, message: 'Admin created successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/auth/verify - verify JWT token
router.get('/verify', authMiddleware, (req, res) => {
  res.json({ success: true, admin: req.admin });
});

module.exports = router;
