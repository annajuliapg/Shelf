const connection = require('../infrastructure/connection');
const moment = require('moment');

class LoginDAO {
    async findByEmail(email) {
        try {
            const conn = await connection();
            const result = await conn.query(`
                SELECT
                    [idUsuario] as id,
                    [nomeUsuario],
                    [nomeExibicao],
                    [biografia],
                    [email],
                    [senha] as password
                FROM [Usuario].[Geral]
                WHERE email = '${email}'
            `);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    async forgotPassword(recoveryData) {
        const { email, token, createdAt } = recoveryData;

        try {
            const conn = await connection();

            const result = await conn.query(`
                UPDATE [Usuario].[Geral] SET 
                    passwordResetToken = '${token}', 
                    passwordResetCreatedAt = '${createdAt}'
                WHERE email = '${email}'
            `);

            return result.recordset;

        } catch (error) {
            throw error;
        };
    };

    async getTokenCreationDate(token) {
        try {
            const conn = await connection();

            const result = await conn.query(`SELECT passwordResetCreatedAt FROM [Usuario].[Geral] WHERE passwordResetToken = '${token}'`);

            return result.recordset;

        } catch (error) {
            throw error;
        }
    }

    async resetPassword(resetData) {
        try {
            const conn = await connection();

            const result = await conn.query(`
                UPDATE [Usuario].[Geral] SET senha = '${resetData.password}',
                    passwordResetToken = '',
                    passwordResetCreatedAt = ''
                WHERE passwordResetToken = '${resetData.token}'
            `);

            return result.recordset;

        } catch (error) {
            throw error;
        }
    }

    async saveRefreshToken(refreshToken) {
        try {
            const { account, token, expires, createdByIp } = refreshToken;

            const conn = await connection();
            const result = await conn.query(`
                INSERT INTO [Usuario].[RefreshToken] (idUsuario, token, expires, created, createdbyip) 
                VALUES ('${account}', '${token}', '${expires}', '${moment().valueOf()}', '${createdByIp}')
            `);

            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    async getAccountByRefreshToken(token) {
        try {
            const conn = await connection();
            const result = await conn.query(`
                SELECT 
                    R.[idUsuario] as id,
                    G.[nomeUsuario],
                    G.[nomeExibicao],
                    G.[biografia],
                    G.[email]
                FROM [Usuario].[RefreshToken] R 
                INNER JOIN [Usuario].[Geral] G on R.idUsuario = G.idUsuario
                WHERE R.token = '${token}'
            `);

            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    };

    async updateRefreshToken(refreshToken) {
        try {
            const token = refreshToken.token;

            delete refreshToken.token;

            Object.keys(refreshToken).forEach((key) => {
                if (refreshToken[key] === undefined || refreshToken[key] == null) {
                    delete refreshToken[key];
                }
            });

            let query = "UPDATE [Usuario].[RefreshToken] SET";

            for (const [key, value] of Object.entries(refreshToken)) {
                query += ` ${key} = '${value}',`
            }

            query = query.replace(/.$/, "");
            query += ` WHERE token = '${token}'`;

            console.log(query);

            const conn = await connection();
            const result = await conn.query(query);

            return result.recordset;
        } catch (error) {
            throw error;
        };
    };

    async getRefreshToken(refreshToken) {
        try {
            const conn = await connection();
            const result = await conn.query(`SELECT * FROM [Usuario].[RefreshToken] WHERE token = '${refreshToken}'`);

            return result.recordset[0];
        } catch (error) {
            throw error;
        };
    };
};



module.exports = new LoginDAO;
