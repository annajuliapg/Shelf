const HttpStatusCodes = require('../HttpStatusCodes');
const BaseError = require('./BaseError');

class NoContentError extends BaseError {
  constructor(problem) {
    super(problem, HttpStatusCodes.NO_CONTENT, true, 'No Content');
  }
}

module.exports = NoContentError;