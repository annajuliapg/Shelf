const express = require('express');
const RegisterController = require('../controllers/register');
const router = express.Router();

router.post('/register', RegisterController.register);
router.delete('/delete/:id', RegisterController.delete);

module.exports = {
  routes: router
}
