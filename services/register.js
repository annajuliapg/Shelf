const RegisterDAO = require('../daos/register');

class RegisterService {
  async register(register) {
    try {
      const results = await RegisterDAO.create(register);
      return results;
    }
    catch (error) {
      throw error;
    };
  };

  async delete(idUsuario) {
    try {
      const results = await RegisterDAO.delete(idUsuario);
      return results;
    }
    catch (error) {
      throw error;
    };
  };

  async checkIfEmailIsRegistered(email) {
    try {
      const results = await RegisterDAO.checkIfEmailIsRegistered(email);
      return results;
    } catch (error) {
      throw error;
    }
  }

  async checkIfUsernameIsRegistered(nomeUsuario) {
    try {
      const results = await RegisterDAO.checkIfUsernameIsRegistered(nomeUsuario);
      return results;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = new RegisterService;
