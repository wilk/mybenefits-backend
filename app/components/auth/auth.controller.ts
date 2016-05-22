import {BaseController, HttpError} from '../../utils/util.util';
import {UserModel} from '../user/user.model';
import * as jwt from 'jwt-simple';
import * as config from 'config';
import * as moment from 'moment';
import {IToken} from "../../middlewares/auth.middleware";

class AuthController extends BaseController {
    prefix = 'AuthController::';

    async register(req, res, next) {
        try {
            this.logger.info(`${this.prefix}register`);

            let userData = {
                email: req.body.email,
                password: req.body.password
            };

            let user = await UserModel.create(userData);
            res.json(user);
        }
        catch (err) {
            BaseController.errorHandler(err, next);
        }
    }

    async login(req, res, next) {
        try {
            this.logger.info(`${this.prefix}login`);

            let userData = {
                email: req.body.email,
                password: req.body.password
            };

            let expirable = req.body.expirable;

            let user: any = await UserModel.findOne(userData);
            if (user === null) return next(new HttpError(400, 'wrong email or password'));
            
            let tokenData: IToken = {
                user: {
                    id: user._id,
                    email: user.email
                }
            };
            if (expirable) tokenData.expire = moment().add(7, 'days');
            let token = jwt.encode(tokenData, config.get<string>('auth.secret'));
            
            res.send(token);
        }
        catch (err) {
            BaseController.errorHandler(err, next);
        }
    }
}

let authCtrl = new AuthController();

export {authCtrl};