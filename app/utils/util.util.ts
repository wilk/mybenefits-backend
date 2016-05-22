import {logger} from './logger.util';

class HttpError implements Error {
    message: string;
    name: string = 'HttpError';
    code: number;

    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }
}

interface ICRUDController {
    prefix: string;
    
    list?(req, res, next);
    single(req, res, next);
    create(req, res, next);
    delete(req, res, next);
    update(req, res, next);
}

class BaseController {
    logger: any = logger;

    static errorHandler(err: Error, next: Function): void {
        let error;
        
        switch (err.name) {
            case 'ValidationError':
                error = new HttpError(400, err.message);
                break;
            case 'HttpError':
                error = err;
                break;
            default:
                error = new HttpError(500, err.message);
        }
        
        next(error);
    }
}

export {HttpError, BaseController, ICRUDController};