const bcrypt = require('bcrypt');
const Validator = require('validatorjs');
const BadRequestError = require('../errors/BadRequestError');
const passwordValidator = require('password-validator');
const emailValidator = require('email-validator');

class AccountUpdateModel {
    #nomeUsuario
    #nomeExibicao
    #biografia
    #email
    #senha

    constructor(body) {

        this.#bodyValidator(body);

        const { nomeUsuario, nomeExibicao, biografia, email } = body;

        this.#nomeUsuario = nomeUsuario;
        this.#nomeExibicao = nomeExibicao;
        this.#biografia = biografia;
        this.#email = email;
        this.#senha;
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

    get email() {
        return this.#email;
    };

    set email(email) {
        this.#email = email;
    };

    get senha() {
        return this.#senha;
    };

    set senha(senha) {
        this.#senha = senha;
    };

    async encrypt(senha) {
        try {
            const hash = await bcrypt.hash(senha, 10)
            return hash;
        } catch (e) {
            throw e;
        }
    }

    #bodyValidator(body) {
        try {
            
            const rules = {
                nomeUsuario: ['required', 'string', 'regex:/^[a-zA-Zà-úÀ0-9 ]*$/'],
                nomeExibicao: ['required', 'string', 'regex:/^[a-zA-Zà-úÀ ]*$/'],
                biografia: 'required|string',
                email: 'required|email',
                senha: 'string',
            };

            const validation = new Validator(body, rules);

            if (!validation.check()) {
                throw new BadRequestError(validation.errors.errors);
            };

            if (!this.emailIsValid(body.email)) {
                throw new Error('Invalid email');
            };

            if (body.senha && this.passwordIsValid(body.senha) instanceof Object) {
                const requirements = this.passwordIsValid(body.senha);
                throw new Error('Missing requirements: ' + JSON.stringify(requirements));
            };

        } catch (error) {
            console.error(error);
            throw error;
        }

    };

    emailIsValid(email) {
        if (!emailValidator.validate(email)) {
            return false;
        };
        return true;
    };

    passwordIsValid(password) {
        const schema = new passwordValidator();

        schema
            .is().min(8)
            .is().max(100)
            .has().digits(1)
            .has().symbols()
            .has().uppercase()
            .has().not().spaces();

        if (schema.validate(password)) {
            return true;
        } else {
            return (schema.validate(password, { list: true }));
        };
    };

};

module.exports = AccountUpdateModel;
