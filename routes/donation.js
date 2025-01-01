const express = require('express');
const Donation = require('../models/Donation');

const router = express.Router();

// Create donation
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, paymentInfo } = req.body;

    const newDonation = new Donation({ name, phone, email, paymentInfo });
    await newDonation.save();

    res.status(201).json({ message: 'Donation created successfully', receiptId: newDonation.receiptId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
