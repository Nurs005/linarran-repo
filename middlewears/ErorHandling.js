const ApiError = require('../errors/ApiErorrs');

module.exports = function (error, req, res, next) {
    if (error instanceof ApiError) {
        return res.status(error.status).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Не предвиденная ошибка!' })
}