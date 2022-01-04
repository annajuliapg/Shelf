class BaseError extends Error {
  constructor (problem, statusCode, isOperational, description) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.problem = problem;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.body = { 
      description: description,
      problem: this.problem
    };
    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;