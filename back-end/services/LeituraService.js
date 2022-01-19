'use strict';

const LeituraDao = require('../daos/LeituraDao');
const UsuarioDAO =  require('../daos/UsuarioDAO')
const NotFoundError = require('../errors/NotFoundError');
const UnprocessableEntityError = require('../errors/UnprocessableEntityError');
const validateIds = require('../utils/validator');

class LeituraService {


    async getLeituras(idUsuario) {
        try {
            await validateIds(idUsuario);

            const usuario = UsuarioDAO.getUser(idUsuario);

            if (!usuario) {
                throw new NotFoundError('Invalid Id');
            }

            const listaLeituras = await LeituraDao.getLeituras(idUsuario);

            return listaLeituras;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getLeiturasByStatus(idUsuario, statusLista) {
        try {
            await validateIds(idUsuario);

            await validateIds(statusLista);

            const usuario = UsuarioDAO.getUser(idUsuario);

            if (!usuario) {
                throw new NotFoundError('Invalid Id');
            }

            const listaLeituras = await LeituraDao.getLeiturasByStatus(idUsuario, statusLista);

            return listaLeituras;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

module.exports = new LeituraService;