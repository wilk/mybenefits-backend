import {accountCtrl} from './account.controller';
import * as express from 'express';

let accountRouter = express.Router();

accountRouter.route('/')
    .get(accountCtrl.list.bind(accountCtrl))
    .post(accountCtrl.create.bind(accountCtrl));
accountRouter.route('/:id')
    .get(accountCtrl.single.bind(accountCtrl))
    .put(accountCtrl.update.bind(accountCtrl))
    .delete(accountCtrl.delete.bind(accountCtrl));

export {accountRouter};