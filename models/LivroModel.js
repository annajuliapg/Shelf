const Validator = require('validatorjs');
const BadRequestError = require('../errors/BadRequestError');

class LivroModel {
    #nome
    #paginas
    #ano
    #autores
    #generos

    constructor(body) {
        this.#bodyValidator(body);

        const {
            nome,
            paginas,
            ano,
            autores,
            generos
        } = body;

        this.#nome = nome;
        this.#paginas = paginas;
        this.#ano = ano;
        this.#autores = autores;
        this.#generos = generos;

    };

    get nome() {
        return this.#nome;
    }

    set nome(nome) {
        this.#nome = nome;
    }

    get paginas() {
        return this.#paginas
    }

    set paginas(paginas) {
        this.#paginas = paginas;
    }

    get ano() {
        return this.#ano;
    }

    set ano(ano) {
        this.#ano = ano;
    }

    get autores() {
        return this.#autores;
    }

    set autores(autores) {
        this.#autores = autores;
    }

    get generos() {
        return this.#generos;
    }

    set generos(generos) {
        this.#generos = generos;
    }

    #bodyValidator(body) {
        try {
            const rules = {
                nome: 'required|string',
                paginas: 'required|integer',
                ano: 'required|integer',
                autores: 'required|array',
                generos: 'required|array',
            };

            const validation = new Validator(body, rules);

            if (!validation.check()) {
                throw new BadRequestError(validation.errors.errors);
            };

        } catch (error) {
            console.error(error);
            throw error;
        }

    };

};

module.exports = LivroModel;