const HttpStatusCodes = require('../HttpStatusCodes');
const BaseError = require('./BaseError');

class NotFoundError extends BaseError {
  constructor(problem) {
    super(problem, HttpStatusCodes.NOT_FOUND, true, 'Not found');
  }
}

module.exports = NotFoundError; 