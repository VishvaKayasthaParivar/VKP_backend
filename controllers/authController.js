const Auth = require('../models/Auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email, phone: user.phone }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register User
exports.register = async (req, res) => {
  try {
    const { name, phone, email, password, state, district } = req.body;

    const existingUser = await Auth.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const newUser = new Auth({ name, phone, email, password, state, district });
    await newUser.save();

    const token = generateToken(newUser);
    
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login with Email
exports.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login with Phone
exports.loginWithPhone = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await Auth.findOne({ phone });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch User Details
exports.getUser = async (req, res) => {
  try {
    const user = await Auth.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Forgot Password (Reset via Email)
exports.forgotPasswordEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Auth.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not registered' });

    // Here, you'd normally send an email with a password reset link.
    res.status(200).json({ message: 'Password reset instructions sent to email' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Forgot Password (Reset via Phone)
exports.forgotPasswordPhone = async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await Auth.findOne({ phone });
    if (!user) return res.status(404).json({ message: 'Phone number not registered' });

    // Here, you'd normally send an SMS with a password reset OTP.
    res.status(200).json({ message: 'Password reset instructions sent to phone' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
