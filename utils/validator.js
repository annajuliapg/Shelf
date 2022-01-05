const BadRequestError = require('../errors/BadRequestError');

async function validateIds(id) {
  if(id === undefined || isNaN(id)) {
    throw new BadRequestError('Invalid Id');
  }
}

module.exports = validateIds;