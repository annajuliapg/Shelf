'use strict';
const Login = require('../models/LoginModel');
const LoginService = require('../services/LoginService');
const LoginUtil = require('../utils/LoginUtil');
const AccountService = require('../services/AccountService');
const UsuarioService = require('../services/UsuarioService');
const crypto = require('crypto');
const moment = require('moment');
const cookie = require('cookie');

class LoginController {
    async login(request, response, next) {
        try {
            const { body } = request;
            const ipAddress = request.ip;
            const login = new Login(body);
            const account = await LoginService.findByEmail(login.email);

            if (account) {
                const isAuthenticated = await LoginUtil.authenticate(login.password, account);

                if (isAuthenticated) {
                    const jwtToken = LoginUtil.generateJwtToken(account);
                    const refreshToken = LoginUtil.generateRefreshToken(account, ipAddress);
                    delete account.password;
                    const tokensData = {
                        ...account,
                        jwtToken,
                        refreshToken: refreshToken.token
                    };

                    await LoginService.saveRefreshToken(refreshToken);

                    LoginUtil.setTokenCookie(response, tokensData);
                    return response.status(200).json({ account, jwtToken });
                };
            }

            return response.status(401).json();
        } catch (error) {
            return response.status(422).send(error.message);
        };
    };

    async refreshToken(request, response, next) {
        try {
            const headersCookie = cookie.parse(request.headers.cookie)

            const cookies = JSON.parse(headersCookie.refreshToken.replace('j:', ''));
            const token = cookies.refreshToken;
            const ipAddress = request.ip;
            await LoginService.refreshToken({ token, ipAddress })
                .then(({ refreshToken, jwtToken, account }) => {
                    const tokensData = {
                        ...account,
                        jwtToken,
                        refreshToken: refreshToken
                    };
                    LoginUtil.setTokenCookie(response, tokensData);
                    response.status(200).json({ jwtToken, account });
                })
                .catch(() => { return response.status(401).json(); });
        } catch (error) {
            return response.status(422).send(error.message);
        };
    };

    async revokeRefreshToken(request, response, next) {
        // accept token from request body or cookie
        const headersCookie = cookie.parse(request.headers.cookie)
        const cookies = JSON.parse(headersCookie.refreshToken.replace('j:', ''));
        const token = cookies.refreshToken;

        console.log("token: " + JSON.stringify(token));

        if (!token) {
            const tokenFromBody = request.body.token
        }

        const { idUsuario } = request.body
        const ipAddress = request.ip;

        if (!token) return response.status(400).json({ message: 'Token is required' });

        // users can revoke their own tokens and admins can revoke any tokens
        const user = await UsuarioService.getUser(idUsuario);
        if (!LoginUtil.ownsToken(idUsuario, token)) {
            return response.status(401).json({ message: 'Unauthorized' });
        }

        LoginService.revokeRefreshToken({ token, ipAddress })
            .then(() => {
                LoginUtil.revokeTokenCookie(response);
                response.status(200).json({ message: 'Token revoked' })
            })
            .catch(next);
    }

    async forgotPassword(request, response, next) {
        try {
            const { email } = request.body;

            if (!email) {
                return response.status(422).json("Invalid email");
            }

            const checkIfEmailIsRegistered = await AccountService.checkIfEmailIsRegistered(email);

            if (checkIfEmailIsRegistered.length == 0) {
                return response.status(404).json();
            }

            const token = crypto.randomBytes(20).toString('hex');

            const createdAt = moment().valueOf();

            const recoveryData = { email, token, createdAt };

            await LoginService.forgotPassword(recoveryData);

            // await LoginUtil.sendResetPasswordToken(email, token)

            return response.status(200).json({ token });

        } catch (error) {
            return response.status(401).send(error.message);
        };
    };

    async resetPassword(request, response, next) {
        try {
            const { token } = request.query;
            const { password } = request.body;

            if (!password) {
                return response.status(422).send("Missing password");
            }

            if (!token) {
                return response.status(422).send("Missing token");
            }

            const isValid = await LoginUtil.validatePassword(password);

            if (isValid) {
                const tokenCreationDate = await LoginService.getTokenCreationDate(token);

                if (tokenCreationDate.length == 0) {
                    return response.status(404).send("Invalid token");
                }

                const now = moment().add(-15, 'minutes').valueOf();

                if (tokenCreationDate[0].passwordResetCreatedAt < now) {
                    return response.status(401).send("Token expired");
                }

                const encryptedPassword = await LoginUtil.encrypt(password);

                const resetData = { password: encryptedPassword, token: token };

                const results = await LoginService.resetPassword(resetData);

                return response.status(200).json(results);

            }

            return response.status(400).json()

        } catch (error) {
            response.status(422).send(error.message);
        }
    }

};

module.exports = new LoginController;
