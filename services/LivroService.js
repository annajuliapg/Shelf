'use strict';

const LivroDao = require('../daos/LivroDao');
const NotFoundError = require('../errors/NotFoundError');
const UnprocessableEntityError = require('../errors/UnprocessableEntityError');

class LivroService {
  async createLivro(Livro) {
    try {
      return await LivroDao.createLivro(Livro);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getLivros() {
    try {
      return await LivroDao.getLivros();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getLivroById(livroId) {
    try{
      if(livroId === undefined || isNaN(livroId)) {
        throw new NotFoundError('Invalid Id');
      }

      const livro = await LivroDao.getLivroById(livroId);

      if(!livro) {
        throw new NotFoundError('Invalid Id');
      }

      return livro;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateLivro(livroId, livro) {
    try {
      if(livroId === undefined || isNaN(livroId)) {
        throw new NotFoundError('Invalid Id');
      }
      
      const livroExists = await this.getLivroById(livroId);

      livroExists ? await LivroDao.updateLivro(livroId, livro) : () => {
        throw new NotFoundError('Invalid Id');
      };

    } catch (error) {
      console.error(error);
      if(error.code === 'EREQUEST') {
        throw new UnprocessableEntityError("One or Some of the data cannot be processed, please contact the responsible for the API");
      }
      throw error;
    }
  }

  async deleteLivro(livroId, livro) {
    try {
      if(livroId === undefined || isNaN(livroId)) {
        throw new NotFoundError('Invalid Id');
      }
      
      const livroExists = await this.getLivroById(livroId);

      livroExists ? await LivroDao.deleteLivro(livroId) : () => {
        throw new NotFoundError('Invalid Id');
      };

    } catch (error) {
      console.error(error);
      if(error.code === 'EREQUEST') {
        throw new UnprocessableEntityError("One or Some of the data cannot be processed, please contact the responsible for the API");
      }
      throw error;
    }
  }

}

module.exports = new LivroService;