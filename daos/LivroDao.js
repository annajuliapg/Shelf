'use strict';

const connection = require('../infrastructure/connection');
const moment = require('moment');

class LivroDao {
    async createLivro(livro) {
        try {

            const conn = await connection();

            let autoresQuery = livro.autores.join(';');

            let generosQuery = livro.generos.join(';');

            const query = `EXEC [Livro].[prc_InsertLivro] '${livro.nome}', ${livro.paginas}, ${livro.ano}, '${autoresQuery}', '${generosQuery}'`;

            const result = await conn.query(query);

            const idLivro = result.recordset[0].idLivro;

            return idLivro;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getLivros() {
        const conn = await connection();

        const livroList = await conn.query(`SELECT * FROM Livro.vw_LivroCompleto`);

        return livroList.recordset;
    }

    async getLivroById(idLivro) {
        const conn = await connection();

        try {
            const livro = await conn.query(`SELECT * FROM Livro.vw_LivroCompleto WHERE idLivro = ${idLivro}`);

            return livro.recordset[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateLivro(idLivro, livro) {
        try {
            const conn = await connection();

            let autoresQuery = livro.autores.join(';');

            let generosQuery = livro.generos.join(';');

            const query = `EXEC [Livro].[prc_UpdateLivro] ${idLivro}, '${livro.nome}', ${livro.paginas}, ${livro.ano}, '${autoresQuery}', '${generosQuery}'`;

            await conn.query(query);

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteLivro(idLivro) {
        try {
            const conn = await connection();

            const query = `EXEC [Livro].[prc_DeleteLivro] ${idLivro}`;

            const result = await conn.query(query);

            if (result.rowsAffected == 0) throw new NotFoundError('Invalid Id');

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

module.exports = new LivroDao;