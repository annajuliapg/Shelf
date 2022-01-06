const bcrypt = require('bcrypt');
const config = require('../config');
const mailer = require('../modules/mailer');
const passwordValidator = require('password-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const LoginDAO = require('../daos/LoginDAO')

class LoginUtil {
    async authenticate(password, account) {
        try {
            if (password == undefined) {
                throw new Error('Missing password');
            };

            if (account.length == 0) {
                return false;
            }

            const hashedPassword = account.password;
            const passwordIsMatch = await bcrypt.compare(password, hashedPassword);

            return passwordIsMatch;
        } catch (error) {
            throw error;
        }
    };

    generateJwtToken(account) {
        // create a jwt token containing the account id that expires in 15 minutes
        return jwt.sign({ sub: account.id, id: account.id }, config.jwtSecret, { expiresIn: '15m' });
    };

    generateRefreshToken(account, ipAddress) {
        const refreshToken = {
            account: account.id,
            token: this.randomTokenString(),
            expires: moment().valueOf() + (1440 * 1000 * 60),
            createdByIp: ipAddress
        };

        return refreshToken;
    };

    randomTokenString() {
        return crypto.randomBytes(40).toString('hex');
    };

    async sendResetPasswordToken(email, token) {
        try {
            const context = {
                token: token,
                url: `${config.frontUrl}${config.resetPassUrl}`,
            }
            mailer.verify(function (error, success) {
                if (error) {
                    throw error;
                } else {
                    console.log("Server is ready to take our messages");
                }
            });
            mailer.sendMail({
                to: email,
                from: `Shelf <${config.mailConfig.auth.user}>`,
                subject: 'Redefina sua senha',
                template: 'auth/forgot_password',
                context: context,
            }, (error) => {
                if (error) {
                    throw new Error({ error: 'Cannot send forgot password email' });
                } else {
                    console.log("Email was sent");
                };

                return res.send();
            });
        } catch (error) {
            throw error;
        }
    }

    setTokenCookie(response, token) {
        // create cookie with refresh token that expires in 7 days
        try {
            const cookieOptions = {
                httpOnly: true,
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            };
            return response.cookie('refreshToken', token, cookieOptions);
        } catch (error) {
            throw error;
        }
    }

    revokeTokenCookie(response) {
        // create cookie with refresh token that expires NOW
        try {
            const cookieOptions = {
                httpOnly: true,
                expires: new Date(Date.now())
            };
            return response.cookie('refreshToken', '', cookieOptions);
        } catch (error) {
            throw error;
        }
    }

    async validatePassword(password) {
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
        }

        const requirements = (schema.validate(password, { list: true }));

        throw new Error('Missing requirements: ' + JSON.stringify(requirements));
    }

    async encrypt(password) {
        try {
            const hash = await bcrypt.hash(password, 10)
            return hash;
        } catch (error) {
            throw error;
        }
    }

    async ownsToken(userId, token) {
        try {
            const user = await LoginDAO.getAccountByRefreshToken(token);
            if (user.id == userId) {
                return true
            } else {
                return false;
            }
        } catch (error) {
            throw error;
        };
    };
}

module.exports = new LoginUtil();
