import {BaseController, ICRUDController, HttpError} from '../../utils/util.util';
import {AccountModel} from './account.model';

class AccountController extends BaseController implements ICRUDController {
    prefix = 'AccountController::';
    
    async list(req, res, next) {
        try {
            this.logger.info(`${this.prefix}list`);

            let userId = req.user.id;

            let accounts = await AccountModel.find({userId: userId});
            res.json(accounts);
        }
        catch (err) {
            BaseController.errorHandler(err, next);
        }
    }

    async create(req, res, next) {
        try {
            this.logger.info(`${this.prefix}create`);

            let accountData = {
                name: req.body.name,
                userId: req.user.id,
                description: req.body.description
            };

            let account = await AccountModel.create(accountData);
            res.json(account);
        }
        catch (err) {
            BaseController.errorHandler(err, next);
        }
    }

    async single(req, res, next) {
        try {
            this.logger.info(`${this.prefix}single`);

            let userId = req.user.id;
            let accountId = req.params.id;

            let account = await AccountModel.findOne({_id: accountId, userId: userId});
            if (account === null) return next(new HttpError(404, `missing account with id ${accountId}`));
            res.json(account);
        }
        catch (err) {
            BaseController.errorHandler(err, next);
        }
    }

    async update(req, res, next) {
        try {
            this.logger.info(`${this.prefix}update`);

            let userId = req.user.id;
            let accountId = req.params.id;
            let accountData = {
                name: req.body.name,
                description: req.body.description
            };

            await AccountModel.findOneAndUpdate({_id: accountId, userId: userId}, accountData);
            // @todo: return the updated entity
            res.end();
        }
        catch (err) {
            BaseController.errorHandler(err, next);
        }
    }

    async delete(req, res, next) {
        try {
            this.logger.info(`${this.prefix}delete`);
            let userId = req.user.id;
            let accountId = req.params.id;

            await AccountModel.findOneAndRemove({_id: accountId, userId: userId});
            res.end();
        }
        catch (err) {
            BaseController.errorHandler(err, next);
        }
    }
}

let accountCtrl = new AccountController();

export {accountCtrl};