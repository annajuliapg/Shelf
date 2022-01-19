'use strict';

const HttpStatusCodes = require('../HttpStatusCodes');
//const LeituraModel = require('../models/LeituraModel');
const LeituraService = require('../services/LeituraService');
const config = require('../config');

class LeituraController {

    async getLeituras(request, response, next) {
        try {
            const idUsuario = request.params.id;

            const listaLeituras = await LeituraService.getLeituras(idUsuario);

            response.status(HttpStatusCodes.OK).json(listaLeituras);
        } catch (error) {
            next(error);
        }
    };

    async getLeiturasByStatus(request, response, next) {
        try {
            const idUsuario = request.params.id;

            const statusLista = request.params.status;

            const listaLeituras = await LeituraService.getLeituras(idUsuario, statusLista);

            response.status(HttpStatusCodes.OK).json(listaLeituras);
        } catch (error) {
            next(error);
        }
    };

};

module.exports = new LeituraController;