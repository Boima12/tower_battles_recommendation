const express = require('express')
const router = express.Router()

const {
    register,
    login,
    getMe
} = require('../controllers/accounts.js')
const authMiddleware = require('../middleware/auth.js');

// POST /api/v1/accounts/register
router.post('/register', register);

// POST /api/v1/accounts/login
router.post('/login', login);

// GET /api/v1/accounts/me
router.get('/me', authMiddleware, getMe);

module.exports = router