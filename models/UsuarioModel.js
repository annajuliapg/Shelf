const bcrypt = require('bcrypt')

class UsuarioModel {
    #nomeUsuario
    #nomeExibicao
    #biografia

    constructor(register) {

        this.#bodyValidator(register);

        const { nomeUsuario, nomeExibicao, biografia, email } = register;

        this.#nomeUsuario = nomeUsuario;
        this.#nomeExibicao = nomeExibicao;
        this.#biografia = biografia;
    };

    get nomeUsuario() {
        return this.#nomeUsuario;
    };

    set nomeUsuario(nomeUsuario) {
        this.#nomeUsuario = nomeUsuario;
    };

    get nomeExibicao() {
        return this.#nomeExibicao;
    };

    set nomeExibicao(nomeExibicao) {
        this.#nomeExibicao = nomeExibicao;
    };

    get biografia() {
        return this.#biografia;
    };

    set biografia(biografia) {
        this.#biografia = biografia;
    };

    #bodyValidator(body) {
        try {
            
            const rules = {
                nomeUsuario: ['required', 'string', 'regex:/^[a-zA-Zà-úÀ0-9 ]*$/'],
                nomeExibicao: ['required', 'string', 'regex:/^[a-zA-Zà-úÀ ]*$/'],
                biografia: 'required|string',
                paginasLidas: 'required|integer',
                qtdLivrosLidos: 'required|integer',
                tempoTotalLeitura: 'required|integer'
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

module.exports = UsuarioModel;
