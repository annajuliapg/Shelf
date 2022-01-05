const connection = require('../infrastructure/connection');

class UsersDAO {

    async getUsers(query) {
        try {
            const conn = await connection();

            if (query == undefined) {
                const result = await conn.query(`
                SELECT
                    G.[idUsuario],
                    G.[nomeUsuario],
                    G.[nomeExibicao],
                    G.[biografia],
                    R.[paginasLidas],
                    R.[qtdLivrosLidos],
                    R.[tempoTotalLeitura]
                FROM [Usuario].[Geral] G
                INNER JOIN [Usuario].[Resumo] R ON R.idUsuario = G.idUsuario
            `);
                return result.recordset;
            }

            let columns = "";
            let keys = Object.keys(query);
            let values = Object.values(query);

            for (let i = 0; i < keys.length; i++) {
                if (i + 1 == keys.length) columns += keys[i] + " = " + "'" + values[i] + "'";
                else columns += keys[i] + " = " + "'" + values[i] + "' AND ";
            }

            const result = await conn.query(`
                SELECT
                    G.[idUsuario],
                    G.[nomeUsuario],
                    G.[nomeExibicao],
                    G.[biografia],
                    R.[paginasLidas],
                    R.[qtdLivrosLidos],
                    R.[tempoTotalLeitura]
                FROM [Usuario].[Geral] G
                INNER JOIN [Usuario].[Resumo] R ON R.idUsuario = G.idUsuario WHERE ${columns}
            `);

            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    async getUser(id) {
        try {
            const conn = await connection();
            const result = await conn.query(`
                SELECT
                    G.[idUsuario],
                    G.[nomeUsuario],
                    G.[nomeExibicao],
                    G.[biografia],
                    R.[paginasLidas],
                    R.[qtdLivrosLidos],
                    R.[tempoTotalLeitura]
                FROM [Usuario].[Geral] G
                INNER JOIN [Usuario].[Resumo] R ON R.idUsuario = G.idUsuario WHERE G.idUsuario = ${id}
            `);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }
};

module.exports = new UsersDAO();