const AccountDAO = require('../daos/AccountDAO');

class AccountService {

    async register(register) {
        try {
            const results = await AccountDAO.create(register);
            return results;
        }
        catch (error) {
            throw error;
        };
    };

    async update(idUsuario, updateData) {
        try {
            const result = await AccountDAO.update(idUsuario, updateData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async delete(idUsuario) {
        try {
            const results = await AccountDAO.delete(idUsuario);
            return results;
        }
        catch (error) {
            throw error;
        };
    };

    async checkIfEmailIsRegistered(email) {
        try {
            const results = await AccountDAO.checkIfEmailIsRegistered(email);
            return results;
        } catch (error) {
            throw error;
        }
    }

    async checkIfUsernameIsRegistered(nomeUsuario) {
        try {
            const results = await AccountDAO.checkIfUsernameIsRegistered(nomeUsuario);
            return results;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = new AccountService;
