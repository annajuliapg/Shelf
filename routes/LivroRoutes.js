const express = require('express');
const LivroController = require('../controllers/LivroController');
const router = express.Router();

router.get('/livros', LivroController.getLivros);
router.get('/livros/:id', LivroController.getLivroById);
router.post('/livros', LivroController.createLivro);
router.patch('/livros/:id', LivroController.updateLivro);
router.delete('/livros/:id', LivroController.deleteLivro);

module.exports = {
    routes: router
}