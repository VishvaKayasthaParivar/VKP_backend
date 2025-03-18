const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) return res.status(403).json({ message: 'Unauthorized' });

    req.admin = admin; // Attach admin info to request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
