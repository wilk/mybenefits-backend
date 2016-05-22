import {logger} from '../utils/logger.util';

function loggerMiddleware(req, res, next): void {
    logger.info(`${req.method} ${req.url}`);
    next();
}

export {loggerMiddleware};