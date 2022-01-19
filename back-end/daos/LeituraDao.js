'use strict';

const connection = require('../infrastructure/connection');
const moment = require('moment');

class LeituraDao {

    async getLeituras(idUsuario) {
        const conn = await connection();

        try {
            const listaLeituras = await conn.query(`SELECT * FROM [Usuario].[Leituras] WHERE [idUsuario] = ${idUsuario}`);

            return listaLeituras.recordset;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getLeiturasByStatus(idUsuario, statusLista) {
        const conn = await connection();

        try {
            const listaLeituras = await conn.query(`SELECT * FROM [Usuario].[Leituras] WHERE [idUsuario] = ${idUsuario} AND [status] = ${statusLista}`);

            return listaLeituras.recordset;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

module.exports = new LeituraDao;