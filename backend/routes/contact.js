const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Message = require('../models/Message');
const authMiddleware = require('../middleware/auth');

// POST contact form submission
router.post('/', [
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('message').notEmpty().withMessage('Message is required').isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    const { name, email, message } = req.body;
    // Save to MongoDB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // Send email with Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Notify owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'ps956984mishr@gmail.com',
      subject: 'New Portfolio Contact Message',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#0f0f1a;color:#fff;padding:30px;border-radius:12px;">
          <h2 style="color:#7c3aed;">New Contact Message 🚀</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background:#1a1a2e;padding:15px;border-radius:8px;border-left:4px solid #7c3aed;">${message}</p>
          <p style="color:#666;font-size:12px;">Received at: ${new Date().toLocaleString()}</p>
        </div>
      `
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#0f0f1a;color:#fff;padding:30px;border-radius:12px;">
          <h2 style="color:#7c3aed;">Thank you, ${name}! 👋</h2>
          <p>Your message has been received. I will get back to you soon.</p>
          <p style="background:#1a1a2e;padding:15px;border-radius:8px;border-left:4px solid #7c3aed;">
            <em>"${message}"</em>
          </p>
          <p>Best regards,<br/><strong>Prashant Mishra</strong><br/>Data Science Student</p>
        </div>
      `
    });

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ success: false, error: 'Failed to send message. Please try again.' });
  }
});

// GET all messages (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH mark message as read (admin only)
router.patch('/:id/read', authMiddleware, async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json({ success: true, data: msg });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE message (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
