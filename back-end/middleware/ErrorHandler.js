function returnError(error, request, response, next) {
    response.status(error.statusCode || 500).json(error.body);
}

module.exports = { returnError };