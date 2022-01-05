'use strict';
const UsuarioModel = require('../models/UsuarioModel');
const UsuarioService = require('../services/UsuarioService');

class UsersController {

    async getUsers(request, response, next) {
        try {
            const querys = request.query

            if (Object.keys(querys).length == 0) {
                const results = await UsuarioService.getUsers();
                return response.status(200).json(results);
            }

            const results = await UsuarioService.getUsers(querys);
            return response.status(200).json(results);

        } catch (error) {
            return response.status(422).send(error.message);
        };
    };

    async getUser(request, response, next) {
        try {
            const id = request.params.id;

            const results = await UsuarioService.getUser(id);

            if (!results) {
                return response.status(404).json(results);
            }

            return response.status(200).json(results);

        } catch (error) {
            return response.status(422).send(error.message);
        };
    };

};

module.exports = new UsersController();