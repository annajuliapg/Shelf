'use strict';

const LivroDao = require('../daos/LivroDao');
const NotFoundError = require('../errors/NotFoundError');
const UnprocessableEntityError = require('../errors/UnprocessableEntityError');
const validateIds = require('../utils/validator');

class LivroService {
    async createLivro(livro) {
        try {
            return await LivroDao.createLivro(livro);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createListaLivro(livros) {
        try {
            return await LivroDao.createListaLivro(livros);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getLivros() {
        try {
            return await LivroDao.getLivros();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getLivroById(idLivro) {
        try {
            await validateIds(idLivro);

            const livro = await LivroDao.getLivroById(idLivro);

            if (!livro) {
                throw new NotFoundError('Invalid Id');
            }

            return livro;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateLivro(idLivro, livro) {
        try {
            await validateIds(idLivro);

            const livroExists = await this.getLivroById(idLivro);

            livroExists ? await LivroDao.updateLivro(idLivro, livro) : () => {
                throw new NotFoundError('Invalid Id');
            };

        } catch (error) {
            console.error(error);
            if (error.code === 'EREQUEST') {
                throw new UnprocessableEntityError("One or Some of the data cannot be processed, please contact the responsible for the API");
            }
            throw error;
        }
    }

    async deleteLivro(idLivro, livro) {
        try {
            await validateIds(idLivro);

            const livroExists = await this.getLivroById(idLivro);

            livroExists ? await LivroDao.deleteLivro(idLivro) : () => {
                throw new NotFoundError('Invalid Id');
            };

        } catch (error) {
            console.error(error);
            if (error.code === 'EREQUEST') {
                throw new UnprocessableEntityError("One or Some of the data cannot be processed, please contact the responsible for the API");
            }
            throw error;
        }
    }

}

module.exports = new LivroService;