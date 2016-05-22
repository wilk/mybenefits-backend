import {HttpError} from '../utils/util.util';
import * as jwt from 'jwt-simple';
import * as config from 'config';
import * as moment from 'moment';

interface IToken {
    user: {
        id: string,
        email: string
    },
    expire?: any
}

function authMiddleware(req, res, next): void {
    try {
        let authorization: string = req.get('Authorization');
        let token: IToken = jwt.decode(authorization, config.get<string>('auth.secret'));
        
        if (token.expire && moment(token.expire).isAfter(moment())) return next(new HttpError(400, 'expired token'));

        if (token.user && token.user.id) {
            req.user = token.user;
            return next();
        }

        let err = new HttpError(400, 'invalid token');
        next(err);
    }
    catch (err) {
        next(err);
    }
}

export {authMiddleware, IToken};