const express = require('express');
const LeiturasController = require('../controllers/LeituraController');
const router = express.Router();

router.get('/leituras/:id', LeiturasController.getLeituras);
router.get('/leituras/:id/:status', LeiturasController.getLeiturasByStatus);



// router.get('/leituras/para-ler/:id', LeiturasController.getLivroById);
// router.get('/leituras/lendo-agora/:id', LeiturasController.getLivroById);
// router.get('/leituras/lidos/:id', LeiturasController.getLivroById);



// router.post('/leituras', LeiturasController.createLivro);
// router.patch('/leituras/:id', LeiturasController.updateLivro);
// router.delete('/leituras/:id', LeiturasController.deleteLivro);

module.exports = {
    routes: router
}