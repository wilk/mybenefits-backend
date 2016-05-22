import {logger} from '../utils/logger.util';
import {HttpError} from "../utils/util.util";

function errorMiddleware(err: HttpError, req, res, next): void {
    logger.error(err);
    
    res.status(err.code || 500).send(err.toString());
}

export {errorMiddleware};