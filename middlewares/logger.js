const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console,
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    )
});

exports.loggerMiddleware = (req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
};