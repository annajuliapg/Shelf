const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const router = express.Router();

router.get('/usuarios', UsuarioController.getUsers);
router.get('/usuarios/:id', UsuarioController.getUser);

module.exports = {
    routes: router
}