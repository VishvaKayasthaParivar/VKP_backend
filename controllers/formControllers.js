const HelpRequest = require('../models/helpRequest');
const ContactRequest = require('../models/contactRequest');


exports.createHelpRequest = async (req, res) => {
  try {
    const help = new HelpRequest(req.body);
    await help.save();
    res.status(201).json(help);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllHelpRequests = async (req, res) => {
  const data = await HelpRequest.find();
  res.json(data);
};

exports.getHelpRequestById = async (req, res) => {
  const data = await HelpRequest.findById(req.params.id);
  res.json(data);
};

exports.updateHelpStatus = async (req, res) => {
  const data = await HelpRequest.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(data);
};

// controllers/contactRequestController.js

exports.createContactRequest = async (req, res) => {
  try {
    const contact = new ContactRequest(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllContactRequests = async (req, res) => {
  const data = await ContactRequest.find();
  res.json(data);
};

exports.getContactRequestById = async (req, res) => {
  const data = await ContactRequest.findById(req.params.id);
  res.json(data);
};

exports.updateContactStatus = async (req, res) => {
  const data = await ContactRequest.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(data);
};