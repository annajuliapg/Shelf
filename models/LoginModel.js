class Login {
    constructor(login) {

        const { email, password } = login;

        this._email = email;
        this._password = password;
    };

    get email() {
        return this._email
    }

    set email(email) {
        this._email = email;
    }

    get password() {
        return this._password;
    }

    set password(password) {
        this._password = password;
    }

};

module.exports = Login;
