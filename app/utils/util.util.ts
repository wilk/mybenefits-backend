class HttpError implements Error {
    message: string;
    name: string = 'HttpError';
    code: number;

    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }
}

export {HttpError};