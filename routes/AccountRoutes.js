const express = require('express');
const AccountController = require('../controllers/AccountController');
const router = express.Router();

router.post('/register', AccountController.register);
router.get('/account/:id', AccountController.getAccount);
router.patch('/update/:id', AccountController.update);
router.delete('/delete/:id', AccountController.delete);

module.exports = {
    routes: router
}
