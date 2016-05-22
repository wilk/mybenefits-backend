import {transactionCtrl} from './transaction.controller';
import * as express from 'express';

let transactionRouter = express.Router();

transactionRouter.route('/:accountId')
    .get(transactionCtrl.list.bind(transactionCtrl))
    .post(transactionCtrl.create.bind(transactionCtrl));
transactionRouter.route('/:accountId/:id')
    .get(transactionCtrl.single.bind(transactionCtrl))
    .put(transactionCtrl.update.bind(transactionCtrl))
    .delete(transactionCtrl.delete.bind(transactionCtrl));

export {transactionRouter};