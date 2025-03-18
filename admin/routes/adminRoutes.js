const express = require('express');
const { adminAuth } = require('../middleware/adminMiddleware');
const adminController = require('../controller/adminController');

const router = express.Router();

// First time Superadmin creation
router.post('/create-superadmin', adminController.createSuperAdmin);

// Admin authentication
router.post('/login', adminController.adminLogin);

// Superadmin only
router.post('/create-admin', adminAuth, adminController.createAdmin);
router.delete('/delete-admin/:adminId', adminAuth, adminController.deleteAdmin);

// Admin listing
router.get('/list-admins', adminAuth, adminController.getAllAdmins);

module.exports = router;
