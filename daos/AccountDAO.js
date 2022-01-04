const connection = require('../infrastructure/connection');

class AccountDAO {
    async create(register) {

        try {
            const conn = await connection();

            const result = await conn.query(`EXEC Usuario.prc_InsertUsuario '${register.nomeUsuario}', '${register.nomeExibicao}', '${register.biografia}', '${register.email}', '${register.senha}'`);
            return result.recordset;
        } catch (error) {
            throw error;
        }
    };

    async update(idUsuario, updateData) {
        try {

            const conn = await connection();

            let query = '';

            if (updateData.senha) {
                query = `EXEC Usuario.prc_UpdateUsuario ${idUsuario}, '${updateData.nomeUsuario}', '${updateData.nomeExibicao}', '${updateData.biografia}', '${updateData.email}', '${updateData.senha}'`
            }
            else {
                query = `EXEC Usuario.prc_UpdateUsuario ${idUsuario}, '${updateData.nomeUsuario}', '${updateData.nomeExibicao}', '${updateData.biografia}', '${updateData.email}'`
            }

            await conn.query(query);

            return;

        } catch (error) {
            throw error;
        }
    }

    async delete(idUsuario) {
        try {

            const conn = await connection();
            const result = await conn.query(`EXEC [Usuario].[prc_DeleteUsuario] '${idUsuario}'`);

            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    async checkIfEmailIsRegistered(email) {
        try {
            const conn = await connection();
            const result = await conn.query(`SELECT idUsuario, email FROM [Usuario].[Geral] WHERE email = '${email}'`);

            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    async checkIfUsernameIsRegistered(nomeUsuario) {
        try {
            const conn = await connection();
            const result = await conn.query(`SELECT idUsuario, nomeUsuario FROM [Usuario].[Geral] WHERE nomeUsuario = '${nomeUsuario}'`);

            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

};

module.exports = new AccountDAO();
