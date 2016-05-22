import {BaseController, ICRUDController, HttpError} from '../../utils/util.util';
import {UserModel, ROLE_ADMIN} from './user.model';

class UserController extends BaseController implements ICRUDController {
    prefix = 'UserController::';

    async list(req, res, next) {
        try {
            this.logger.info(`${this.prefix}list`);
            if (req.user.role !== ROLE_ADMIN) return res.status(400).send('you are not allowed to list the users');

            let users = await UserModel.find({});
            res.json(users);
        }
        catch (err) {
            BaseController.errorHandler(err, next);
        }
    }

    async create(req, res, next) {
        try {
            this.logger.info(`${this.prefix}create`);

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

    async single(req, res, next) {
        try {
            this.logger.info(`${this.prefix}single`);

            let userId = req.params.id;

            let user = await UserModel.findById(userId);
            if (user === null) return next(new HttpError(404, `missing user with id ${userId}`));
            res.json(user);
        }
        catch (err) {
            BaseController.errorHandler(err, next);
        }
    }

    async update(req, res, next) {
        try {
            this.logger.info(`${this.prefix}update`);

            // @todo: check if the user can update the selected user

            let userId = req.params.id;
            let userData = {
                email: req.body.email,
                password: req.body.email
            };

            await UserModel.findByIdAndUpdate(userId, userData);
            res.end();
        }
        catch (err) {
            BaseController.errorHandler(err, next);
        }
    }

    async delete(req, res, next) {
        try {
            this.logger.info(`${this.prefix}delete`);
            let userId = req.params.id;
            await UserModel.findByIdAndRemove(userId);
            res.end();
        }
        catch (err) {
            BaseController.errorHandler(err, next);
        }
    }
}

let userCtrl = new UserController();

export {userCtrl};