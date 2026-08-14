const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// GET /auth/login
router.get('/login', authController.showLogin);

// GET /auth/register
router.get('/register', authController.showRegister);

// POST /auth/verify-token  (Firebase manda el token aquí)
router.post('/verify-token', authController.verifyToken);

// GET /auth/logout
router.get('/logout', authController.logout);

module.exports = router;