const express = require('express');
const Membership = require('../models/Membership');

const router = express.Router();

// Create membership
router.post('/', async (req, res) => {
  try {
    const { name, phone, paymentInfo } = req.body;

    const newMembership = new Membership({ name, phone, paymentInfo });
    await newMembership.save();

    res.status(201).json({ message: 'Membership created successfully', receiptId: newMembership.receiptId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
