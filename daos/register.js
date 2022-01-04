const connection = require('../infrastructure/connection');

class RegisterDAO {
  async create(register) {
    
    try {
      const conn = await connection();

      const result = await conn.query(`EXEC Usuario.prc_InsertUsuario '${register.nomeUsuario}', '${register.nomeExibicao}', '${register.biografia}', '${register.email}', '${register.senha}'`);
      return result.recordset;
    } catch (error) {
      throw error;
    }
  };

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
      const result = await conn.query(`SELECT email FROM [Usuario].[Geral] WHERE email = '${email}'`);

      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  }

  async checkIfUsernameIsRegistered(nomeUsuario) {
    try {
      const conn = await connection();
      const result = await conn.query(`SELECT nomeUsuario FROM [Usuario].[Geral] WHERE nomeUsuario = '${nomeUsuario}'`);

      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  }

};

module.exports = new RegisterDAO();
