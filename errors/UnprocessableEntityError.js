const HttpStatusCodes = require('../HttpStatusCodes');
const BaseError = require('./BaseError');

class UnprocessableEntityError extends BaseError {
    constructor(problem) {
        super(problem, HttpStatusCodes.UNPROCESSABLE_ENTITY, true, 'Unprocessable Entity');
    }
}

module.exports = UnprocessableEntityError;