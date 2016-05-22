import {BaseController, ICRUDController, HttpError} from '../../utils/util.util';
import {TransactionModel} from './transaction.model';
import {AccountModel} from "../account/account.model";
import * as moment from 'moment';

class TransactionController extends BaseController implements ICRUDController {
    prefix = 'TransactionController::';

    async list(req, res, next) {
        try {
            this.logger.info(`${this.prefix}list`);

            let userId = req.user.id;
            let accountId = req.params.accountId;

            let account = await AccountModel.findOne({_id: accountId, userId: userId});
            if (account === null) return next(new HttpError(403, 'this user is not allowed to list the requested account transactions'));

            let transactions = await TransactionModel.find({userId: userId, accountId: accountId});
            res.json(transactions);
        }
        catch (err) {
            BaseController.errorHandler(err, next);
        }
    }

    async create(req, res, next) {
        try {
            this.logger.info(`${this.prefix}create`);

            if (typeof req.body.date === 'undefined' || req.body.date === null) return next(new HttpError(400, 'missing transaction date'));

            let transactionData: any = {
                userId: req.user.id,
                accountId: req.params.accountId,
                description: req.body.description,
                date: moment(req.body.date)
            };

            let account = await AccountModel.findOne({_id: transactionData.accountId, userId: transactionData.userId});
            if (account === null) return next(new HttpError(403, 'this user is not allowed to create a new transaction for the requested account'));

            if (req.body.expense) transactionData.expense = req.body.expense;
            if (req.body.income) transactionData.income = req.body.income;

            let transaction = await TransactionModel.create(transactionData);
            res.json(transaction);
        }
        catch (err) {
            BaseController.errorHandler(err, next);
        }
    }

    async single(req, res, next) {
        try {
            this.logger.info(`${this.prefix}single`);

            let userId = req.user.id;
            let accountId = req.params.accountId;
            let transactionId = req.params.id;

            let transaction = await TransactionModel.findOne({_id: transactionId, userId: userId, accountId: accountId});
            if (transaction === null) return next(new HttpError(404, `missing transaction with id ${transactionId}`));
            res.json(transaction);
        }
        catch (err) {
            BaseController.errorHandler(err, next);
        }
    }

    async update(req, res, next) {
        try {
            this.logger.info(`${this.prefix}update`);

            let transactionId = req.params.id;
            let transactionData: any = {
                userId: req.user.id,
                accountId: req.params.accountId,
                description: req.body.description,
                date: moment(req.body.date)
            };

            let account = await AccountModel.findOne({_id: transactionData.accountId, userId: transactionData.userId});
            if (account === null) return next(new HttpError(403, 'this user is not allowed to update the transaction for the requested account'));

            if (req.body.expense) transactionData.expense = req.body.expense;
            if (req.body.income) transactionData.income = req.body.income;

            await TransactionModel.findOneAndUpdate({_id: transactionId, userId: transactionData.userId, accountId: transactionData.accountId}, transactionData);
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
            let accountId = req.params.accountId;
            let transactionId = req.params.id;

            let account = await AccountModel.findOne({_id: accountId, userId: userId});
            if (account === null) return next(new HttpError(403, 'this user is not allowed to update the transaction for the requested account'));

            await TransactionModel.findOneAndRemove({_id: transactionId, userId: userId, accountId: accountId});
            res.end();
        }
        catch (err) {
            BaseController.errorHandler(err, next);
        }
    }
}

let transactionCtrl = new TransactionController();

export {transactionCtrl};