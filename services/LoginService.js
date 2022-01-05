const LoginDAO = require('../daos/LoginDAO');
const LoginUtil = require('../utils/LoginUtil');
const moment = require('moment');

class LoginService {
    async findByEmail(email) {
        try {
            const results = await LoginDAO.findByEmail(email);
            return results;
        }
        catch (error) {
            throw error;
        };
    };


    async refreshToken({ token, ipAddress }) {
        const account = await LoginDAO.getAccountByRefreshToken(token);

        const refreshToken = { token };
        // replace old refresh token with a new one and save
        const newRefreshToken = LoginUtil.generateRefreshToken(account, ipAddress);
        refreshToken.revoked = moment().valueOf();
        refreshToken.revokedByIp = ipAddress;
        refreshToken.replacedByToken = newRefreshToken.token;
        await this.updateRefreshToken(refreshToken);
        await this.saveRefreshToken(newRefreshToken);

        // generate new jwt
        const jwtToken = LoginUtil.generateJwtToken(account);

        // return basic details and tokens
        return {
            account,
            jwtToken,
            refreshToken: newRefreshToken.token
        };
    };

    async revokeRefreshToken({ token, ipAddress }) {
        const refreshToken = await LoginDAO.getRefreshToken(token);

        // revoke token and save
        refreshToken.revoked = moment().valueOf();
        refreshToken.revokedByIp = ipAddress;
        console.log("refresh token: " + JSON.stringify(refreshToken));
        await this.updateRefreshToken(refreshToken);
        return;
    }

    async saveRefreshToken(refreshToken) {
        try {
            const results = await LoginDAO.saveRefreshToken(refreshToken);
            return results;
        } catch (error) {
            throw error;
        }
    }


    async updateRefreshToken(refreshToken) {
        try {
            const results = await LoginDAO.updateRefreshToken(refreshToken);
            return results;
        } catch (error) {
            throw error;
        }
    }

    async forgotPassword(recoveryData) {
        try {
            const results = await LoginDAO.forgotPassword(recoveryData);
            return results;
        }
        catch (error) {
            throw error;
        };
    };

    async getTokenCreationDate(token) {
        try {
            const results = await LoginDAO.getTokenCreationDate(token);
            return results;

        } catch (error) {
            throw error;
        }
    }

    async resetPassword(resetData) {
        try {
            const results = await LoginDAO.resetPassword(resetData);
            return results;

        } catch (error) {
            throw error;
        }
    }
};

module.exports = new LoginService();
