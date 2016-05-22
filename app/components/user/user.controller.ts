import {BaseController, ICRUDController, HttpError} from '../../utils/util.util';
import {UserModel} from './user.model';

class UserController extends BaseController implements ICRUDController {
    prefix = 'UserController::';
    
    async single(req, res, next) {
        try {
            this.logger.info(`${this.prefix}single`);

            let userId = req.params.id;

            if (userId !== req.user.id) return next(new HttpError(403, `you are not allowed to read the user with id ${userId}`));

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

            let userId = req.params.id;
            let userData = {
                email: req.body.email,
                password: req.body.email
            };

            if (userId !== req.user.id) return next(new HttpError(403, `you are not allowed to update the user with id ${userId}`));

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

            if (userId !== req.user.id) return next(new HttpError(403, `you are not allowed to remove the user with id ${userId}`));

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