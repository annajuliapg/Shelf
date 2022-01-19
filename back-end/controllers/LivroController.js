'use strict';

const HttpStatusCodes = require('../HttpStatusCodes');
const LivroModel = require('../models/LivroModel');
const LivroService = require('../services/LivroService');
const config = require('../config');

class LivroController {

    async createLivro(request, response, next) {
        
        const { body } = request;

        try {

            if (body instanceof Array) {

                let listaLivros = [];

                body.forEach((livroObject) => {
                    const livro = new LivroModel(livroObject);
                    listaLivros.push(livro);
                })

                await LivroService.createListaLivro(listaLivros);

            } else {
                const livro = new LivroModel(body);

                await LivroService.createLivro(livro);
            }

            response.status(HttpStatusCodes.CREATED).end();
        }
        catch (error) {
            next(error);
        };
    };

    async getLivros(request, response, next) {
        try {
            const livrosList = await LivroService.getLivros();

            response.status(HttpStatusCodes.OK).json(livrosList);
        } catch (error) {
            next(error);
        }
    }

    async getLivroById(request, response, next) {
        try {
            const idLivro = request.params.id;

            const livro = await LivroService.getLivroById(idLivro);

            response.status(HttpStatusCodes.OK).json(livro);
        } catch (error) {
            next(error);
        }
    };

    async updateLivro(request, response, next) {
        try {
            const idLivro = request.params.id;

            const { body } = request;

            const livro = new LivroModel(body);

            await LivroService.updateLivro(idLivro, livro);

            response.status(HttpStatusCodes.NO_CONTENT).end();
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async deleteLivro(request, response, next) {
        try {
            const idLivro = request.params.id;

            await LivroService.deleteLivro(idLivro);

            response.status(HttpStatusCodes.NO_CONTENT).end();
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

};

module.exports = new LivroController;