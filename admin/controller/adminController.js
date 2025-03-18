const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateAdminToken = (admin) => {
  return jwt.sign({ id: admin._id, email: admin.email, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Create First Dummy Admin (Run Once)
exports.createSuperAdmin = async (req, res) => {
  try {
    const {name,email,password}=req.body;
    const existingAdmin = await Admin.findOne({ role: 'superadmin' });
    if (existingAdmin) return res.status(400).json({ message: 'Superadmin already exists' });

    const superAdmin = new Admin({
      name,
      email,
      password,
      role: 'superadmin',
    });

    await superAdmin.save();
    res.status(201).json({ message: 'Superadmin created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin Login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateAdminToken(admin);
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create New Admin (Only Superadmin)
exports.createAdmin = async (req, res) => {
  try {
    if (req.admin.role !== 'superadmin') {
      return res.status(403).json({ message: 'Only superadmin can create admins' });
    }

    const { name, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an Admin (Only Superadmin)
exports.deleteAdmin = async (req, res) => {
  try {
    if (req.admin.role !== 'superadmin') {
      return res.status(403).json({ message: 'Only superadmin can delete admins' });
    }

    const { adminId } = req.params;
    await Admin.findByIdAndDelete(adminId);

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch All Admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
