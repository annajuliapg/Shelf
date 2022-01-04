const config = require('../config');
const sql = require("mssql");

const connection = async function () {
    if (global.connection) {
        return global.connection;
    }

    try {
        const connection = await sql.connect(config.dbConnectionConfig);
        global.connection = connection;
        return connection;
    }
    catch (err) {
        console.error(err);
    }
};

module.exports = connection;
