const express = require('express');
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Register User
router.post('/register', authController.register);

// Login Routes
router.post('/login/email', authController.loginWithEmail);
router.post('/login/phone', authController.loginWithPhone);

// Fetch User Details (Protected)
router.get('/user', verifyToken, authController.getUser);

// Forgot Password Routes
router.post('/forgot-password/email', authController.forgotPasswordEmail);
router.post('/forgot-password/phone', authController.forgotPasswordPhone);

module.exports = router;
