import {userCtrl} from './user.controller';
import * as express from 'express';

let userRouter = express.Router();

userRouter.route('/')
    .get(userCtrl.list.bind(userCtrl))
    .post(userCtrl.create.bind(userCtrl));
userRouter.route('/:id')
    .get(userCtrl.single.bind(userCtrl))
    .put(userCtrl.update.bind(userCtrl))
    .delete(userCtrl.delete.bind(userCtrl));

export {userRouter};