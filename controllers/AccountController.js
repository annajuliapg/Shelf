'use strict';
const AccountRegisterModel = require('../models/AccountRegisterModel');
const AccountUpdateModel = require('../models/AccountUpdateModel');
const AccountService = require('../services/AccountService');

class AccountController {

    async register(request, response, next) {
        try {
            const { body } = request;

            const register = new AccountRegisterModel(body);

            const checkIfEmailIsRegistered = await AccountService.checkIfEmailIsRegistered(register.email);

            if (checkIfEmailIsRegistered !== undefined) {
                return response.status(409).send("Email já registrado");
            }

            const checkIfUsernameIsRegistered = await AccountService.checkIfUsernameIsRegistered(register.nomeUsuario);

            if (checkIfUsernameIsRegistered !== undefined) {
                return response.status(409).send("Nome de usuário já registrado");
            }

            register.senha = await register.encrypt(body.senha);

            const results = await AccountService.register(register);

            return response.status(201).json(results);

        } catch (error) {
            return response.status(422).send(error.message);
        };
    };

    async update(request, response, next) {
        try {
            const { body } = request;

            const idUsuario = request.params.id;

            const update = new AccountUpdateModel(body);

            const checkIfEmailIsRegistered = await AccountService.checkIfEmailIsRegistered(update.email);

            console.log(checkIfEmailIsRegistered)

            if (checkIfEmailIsRegistered !== undefined && checkIfEmailIsRegistered.idUsuario != idUsuario) {
                return response.status(409).send("Email já registrado");
            }

            const checkIfUsernameIsRegistered = await AccountService.checkIfUsernameIsRegistered(update.nomeUsuario);

            if (checkIfUsernameIsRegistered !== undefined && checkIfUsernameIsRegistered.idUsuario != idUsuario) {
                return response.status(409).send("Nome de usuário já registrado");
            }

            if (body.senha) {
                update.senha = await update.encrypt(body.senha);
            }

            await AccountService.update(idUsuario, update);

            return response.status(200).end();

        } catch (error) {
            return response.status(422).send(error.message);
        };
    };

    async delete(request, response, next) {
        try {

            const idUsuario = request.params.id;

            const results = await AccountService.delete(idUsuario);
            return response.status(200).json(results);
        } catch (error) {
            return response.status(422).send(error.message);
        };
    };

};

module.exports = new AccountController();
