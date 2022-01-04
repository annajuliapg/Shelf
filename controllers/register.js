'use strict';
const Register = require('../models/register');
const RegisterService = require('../services/register');
const RegisterUtil = require('../utils/register');

class RegisterController {

    async register(request, response, next) {
        try {
            const { body } = request;

            const register = new Register(body);

            const checkIfEmailIsRegistered = await RegisterService.checkIfEmailIsRegistered(register.email);

            if (checkIfEmailIsRegistered !== undefined) {
                return response.status(409).send("Email já registrado");
            }

            const checkIfUsernameIsRegistered = await RegisterService.checkIfUsernameIsRegistered(register.nomeUsuario);

            if (checkIfUsernameIsRegistered !== undefined) {
                return response.status(409).send("Nome de usuário já registrado");
            }

            register.senha = await register.encrypt(body.senha);

            const results = await RegisterService.register(register);

            return response.status(201).json(results);

        } catch (error) {
            return response.status(422).send(error.message);
        };
    };

    async delete(request, response, next) {
        try {

            const idUsuario = request.params.id;

            const results = await RegisterService.delete(idUsuario);
            return response.status(200).json(results);
        } catch (error) {
            return response.status(422).send(error.message);
        };
    };
};

module.exports = new RegisterController();
