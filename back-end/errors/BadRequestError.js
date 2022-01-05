const HttpStatusCodes = require('../HttpStatusCodes');
const BaseError = require('./BaseError');

class BadRequestError extends BaseError {
    constructor(problem) {
        super(problem, HttpStatusCodes.BAD_REQUEST, true, 'Bad Request');
    }
}

module.exports = BadRequestError;