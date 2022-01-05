const express = require('express');
const LoginController = require('../controllers/LoginController');
const router = express.Router();

router.post('/login', LoginController.login);
router.post('/refresh-token', LoginController.refreshToken);
router.post('/revoke-token', LoginController.revokeRefreshToken);
router.post('/forgot-password', LoginController.forgotPassword);
router.patch('/reset-password', LoginController.resetPassword);

module.exports = {
    routes: router
}
