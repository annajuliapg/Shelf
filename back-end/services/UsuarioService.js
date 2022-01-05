const UsuarioDAO = require('../daos/UsuarioDAO');

class UsersService {

    async getUsers(query) {
        try {
            const result = await UsuarioDAO.getUsers(query);
            return result;
        }
        catch (error) {
            throw error;
        }
    }

    async getUser(id) {
        try {
            const result = await UsuarioDAO.getUser(id);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
};

module.exports = new UsersService;