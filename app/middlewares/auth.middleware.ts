import {HttpError} from '../utils/util.util';
import * as jwt from 'jwt-simple';
import * as config from 'config';

interface IToken {
    user: {
        id: string
    }
}

function authMiddleware(req, res, next): void {
    try {
        let authorization: string = req.get('Authorization');
        let token: IToken = jwt.decode(authorization, config.get<string>('auth.secret'));

        if (token.user && token.user.id) {
            req.user = token.user;
            return next();
        }

        let err = new HttpError(404, 'invalid token');
        next(err);
    }
    catch (err) {
        next(err);
    }
}

export {authMiddleware, IToken};